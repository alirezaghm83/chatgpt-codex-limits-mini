// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.11.0
// @description  Shows the remaining 5-hour and weekly limits in the ChatGPT sidebar.
// @license      MIT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// @icon         https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/assets/icon-128.png
// @downloadURL  https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// @updateURL    https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// ==/UserScript==

(() => {
  'use strict';

  const CONFIG = Object.freeze({
    USAGE_PATH: '/backend-api/wham/usage',
    REFRESH_MS: 2 * 60 * 1000,
    HEALTH_CHECK_MS: 5 * 1000,
    COUNTDOWN_MS: 30 * 1000,
    FIVE_HOURS_SECONDS: 5 * 60 * 60,
    WEEK_SECONDS: 7 * 24 * 60 * 60,
  });

  const ROW_ID = 'codex-limits-native-row';
  const STYLE_ID = 'codex-limits-native-style';

  let isFetching = false;
  let lastFetchAt = 0;
  let lastUsage = null;
  let currentMode = null;
  let currentAnchor = null;
  let lastRenderKey = '';
  let reconcileTimer = null;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${ROW_ID} { cursor:pointer; }
      #${ROW_ID} .codex-limits-content { display:flex; align-items:center; gap:10px; min-width:0; width:100%; }
      #${ROW_ID} .codex-limits-icon { display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; width:18px; height:18px; }
      #${ROW_ID} .codex-limits-values { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; min-width:0; width:100%; font-variant-numeric:tabular-nums; }
      #${ROW_ID} .codex-limit { display:flex; flex-direction:column; align-items:flex-start; min-width:0; line-height:1.05; white-space:nowrap; }
      #${ROW_ID} .codex-limit-main { display:flex; align-items:baseline; gap:4px; font-size:11px; }
      #${ROW_ID} .codex-limit-label { opacity:.72; font-weight:400; }
      #${ROW_ID} .codex-limit-remaining { opacity:1; font-weight:700; }
      #${ROW_ID} .codex-limit-reset { margin-top:3px; font-size:9px; opacity:.42; font-weight:400; }
      #${ROW_ID}.codex-limits-collapsed .codex-limits-values { display:none !important; }
      #${ROW_ID} .codex-limits-spinner { display:inline-block; width:10px; height:10px; border:1.5px solid currentColor; border-right-color:transparent; border-radius:50%; animation:codex-spin .7s linear infinite; opacity:.65; }
      @keyframes codex-spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  function isVisible(element) {
    if (!element?.isConnected) return false;
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  }

  function bestVisible(nodes) {
    return [...nodes]
      .filter(isVisible)
      .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0] || null;
  }

  function getProfileButton() {
    return bestVisible(document.querySelectorAll('[data-testid="accounts-profile-button"]'));
  }

  function getExporterTrigger() {
    return bestVisible([...document.querySelectorAll('.ce-nav-trigger')]
      .filter(element => element.id !== ROW_ID && !element.closest(`#${ROW_ID}`)));
  }

  function findInsertWrapper(trigger) {
    if (!trigger) return null;
    let node = trigger;
    for (let i = 0; i < 5 && node.parentElement; i += 1) {
      const parent = node.parentElement;
      if (parent.hasAttribute('data-radix-collection-item') ||
          parent.hasAttribute('data-state') ||
          parent.children.length === 1) {
        node = parent;
      } else {
        break;
      }
    }
    return node;
  }

  function stripInteractiveAttributes(root) {
    for (const node of [root, ...root.querySelectorAll('*')]) {
      for (const attribute of [...node.attributes]) {
        if (attribute.name === 'id' ||
            attribute.name.startsWith('aria-') ||
            attribute.name.startsWith('data-radix') ||
            attribute.name === 'data-state') {
          node.removeAttribute(attribute.name);
        }
      }
    }
  }

  function iconSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 17.5V14a8 8 0 0 1 16 0v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 17.5h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 14l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></svg>`;
  }

  function buildControlledContent(row) {
    row.replaceChildren();
    const content = document.createElement('span');
    content.className = 'codex-limits-content';

    const icon = document.createElement('span');
    icon.className = 'codex-limits-icon';
    icon.innerHTML = iconSvg();

    const values = document.createElement('span');
    values.className = 'codex-limits-values';
    content.append(icon, values);
    row.append(content);
  }

  function createRow(source) {
    const row = source.cloneNode(false);
    stripInteractiveAttributes(row);
    row.id = ROW_ID;
    row.classList.remove('ce-nav-trigger-collapsed');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Usage limits; click to refresh');
    row.title = 'Click to refresh usage limits';
    buildControlledContent(row);
    return row;
  }

  function bindRow(row) {
    const refresh = event => {
      event.preventDefault();
      event.stopPropagation();
      fetchUsage(true);
    };
    row.addEventListener('click', refresh, true);
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') refresh(event);
    }, true);
    for (const eventName of ['mouseenter', 'pointerenter']) {
      row.addEventListener(eventName, event => event.stopPropagation(), true);
    }
  }

  function getMountTarget() {
    const exporter = getExporterTrigger();
    if (exporter) {
      const anchor = findInsertWrapper(exporter);
      if (anchor?.parentElement) return { mode: 'exporter', source: exporter, anchor };
    }

    const profile = getProfileButton();
    if (!profile) return null;
    const source = profile.closest('button, a, [role="button"]') || profile;
    const anchor = source;
    return anchor.parentElement ? { mode: 'standalone', source, anchor } : null;
  }

  function mount() {
    addStyles();
    const target = getMountTarget();
    if (!target) return null;

    let row = document.getElementById(ROW_ID);
    const correctlyMounted = row?.isConnected &&
      currentMode === target.mode &&
      currentAnchor === target.anchor &&
      row.parentElement === target.anchor.parentElement;

    if (!correctlyMounted) {
      row?.remove();
      row = createRow(target.source);
      target.anchor.parentElement.insertBefore(row, target.anchor);
      bindRow(row);
      currentMode = target.mode;
      currentAnchor = target.anchor;
      lastRenderKey = '';
    }

    syncCollapsed(row, target.source, target.mode);
    render();
    return row;
  }

  function syncCollapsed(row, source, mode) {
    let collapsed = false;
    if (mode === 'exporter') {
      collapsed = source.classList.contains('ce-nav-trigger-collapsed');
    } else {
      const sidebar = row.closest('nav, aside, [data-testid*="sidebar"]');
      const rect = sidebar?.getBoundingClientRect();
      collapsed = Boolean(rect && rect.width < 100);
    }
    row.classList.toggle('codex-limits-collapsed', collapsed);
  }

  function deepFindToken(value, seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return null;
    seen.add(value);
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === 'string' && /access.*token|token.*access/i.test(key) && item.split('.').length === 3) return item;
      if (item && typeof item === 'object') {
        const found = deepFindToken(item, seen);
        if (found) return found;
      }
    }
    return null;
  }

  async function getAccessToken() {
    try {
      const response = await fetch('/api/auth/session', { credentials: 'include', cache: 'no-store' });
      if (!response.ok) return null;
      return deepFindToken(await response.json());
    } catch {
      return null;
    }
  }

  function allObjects(value, out = [], seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return out;
    seen.add(value);
    out.push(value);
    for (const item of Object.values(value)) allObjects(item, out, seen);
    return out;
  }

  function firstFinite(values) {
    for (const value of values) {
      if (value == null || value === '') continue;
      const number = Number(value);
      if (Number.isFinite(number)) return number;
    }
    return null;
  }

  function secondsFor(object) {
    return firstFinite([
      object.limit_window_seconds,
      object.window_seconds,
      object.window?.seconds,
      object.limit_window?.seconds,
    ]);
  }

  function usedFor(object) {
    return firstFinite([
      object.used_percent,
      object.utilization_percent,
      object.usage_percent,
      object.percent_used,
    ]);
  }

  function resetAtFor(object) {
    const raw = object.reset_at ?? object.resetAt ?? object.resets_at ??
      object.window?.reset_at ?? object.limit_window?.reset_at;
    if (raw != null && raw !== '') {
      if (typeof raw === 'number' || /^\d+(\.\d+)?$/.test(String(raw))) {
        let timestamp = Number(raw);
        if (Number.isFinite(timestamp)) {
          if (timestamp < 1e12) timestamp *= 1000;
          return timestamp;
        }
      }
      const parsed = Date.parse(raw);
      if (Number.isFinite(parsed)) return parsed;
    }

    const after = firstFinite([
      object.reset_after_seconds,
      object.resetAfterSeconds,
      object.window?.reset_after_seconds,
    ]);
    return after == null ? null : Date.now() + after * 1000;
  }

  function findWindow(payload, targetSeconds) {
    let best = null;
    let bestDistance = Infinity;
    for (const object of allObjects(payload)) {
      const seconds = secondsFor(object);
      const used = usedFor(object);
      if (seconds == null || used == null) continue;
      const distance = Math.abs(seconds - targetSeconds);
      if (distance < bestDistance && distance <= Math.max(120, targetSeconds * .03)) {
        bestDistance = distance;
        best = {
          remaining: Math.max(0, Math.min(100, 100 - used)),
          resetAt: resetAtFor(object),
        };
      }
    }
    return best;
  }

  function parseUsage(payload) {
    return {
      five: findWindow(payload, CONFIG.FIVE_HOURS_SECONDS),
      week: findWindow(payload, CONFIG.WEEK_SECONDS),
    };
  }

  async function fetchUsage(force = false) {
    if (isFetching || (!force && Date.now() - lastFetchAt < CONFIG.REFRESH_MS)) return;
    isFetching = true;
    render(true);
    try {
      const token = await getAccessToken();
      const headers = { accept: 'application/json' };
      if (token) headers.authorization = `Bearer ${token}`;
      const response = await fetch(CONFIG.USAGE_PATH, {
        credentials: 'include',
        cache: 'no-store',
        headers,
      });
      if (!response.ok) throw new Error(`usage ${response.status}`);
      const parsed = parseUsage(await response.json());
      if (!parsed.five && !parsed.week) throw new Error('rate-limit windows not found');
      lastUsage = parsed;
      lastFetchAt = Date.now();
    } catch (error) {
      console.warn('[Usage Limits Mini]', error);
      if (!lastUsage) lastUsage = { error: true };
    } finally {
      isFetching = false;
      render();
    }
  }

  function formatRemaining(value) {
    if (!Number.isFinite(value)) return '—';
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
  }

  function formatCountdown(resetAt) {
    if (!Number.isFinite(resetAt)) return '↻ —';
    let seconds = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
    if (seconds <= 30) return '↻ now';
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    if (days > 0) return `↻ ${days}d ${hours}h`;
    if (hours > 0) return `↻ ${hours}h ${minutes}m`;
    return `↻ ${Math.max(1, minutes)}m`;
  }

  function resetTitle(resetAt) {
    return Number.isFinite(resetAt)
      ? `Resets ${new Date(resetAt).toLocaleString()}`
      : 'Reset time unavailable';
  }

  function escapeAttribute(value) {
    return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  }

  function limitHtml(label, window) {
    const remaining = formatRemaining(window?.remaining);
    const countdown = formatCountdown(window?.resetAt);
    const title = escapeAttribute(resetTitle(window?.resetAt));
    return `<span class="codex-limit" title="${title}"><span class="codex-limit-main"><span class="codex-limit-label">${label}</span><strong class="codex-limit-remaining">${remaining}</strong></span><span class="codex-limit-reset">${countdown}</span></span>`;
  }

  function render(loading = false) {
    const values = document.querySelector(`#${ROW_ID} .codex-limits-values`);
    if (!values) return;

    let key;
    let html;
    if (loading && !lastUsage) {
      key = 'loading';
      html = '<span class="codex-limits-spinner" aria-label="Loading"></span>';
    } else if (lastUsage?.error) {
      key = 'error';
      html = '<span class="codex-limit-reset">Unavailable</span>';
    } else if (!lastUsage) {
      key = 'empty';
      html = '<span class="codex-limit-reset">…</span>';
    } else {
      html = limitHtml('5h', lastUsage.five) + limitHtml('Weekly', lastUsage.week);
      key = html;
    }

    if (key === lastRenderKey) return;
    values.innerHTML = html;
    lastRenderKey = key;
  }

  function reconcile() {
    const row = mount();
    if (row) fetchUsage(false);
  }

  const observer = new MutationObserver(mutations => {
    const externalChange = mutations.some(mutation => {
      const target = mutation.target.nodeType === Node.ELEMENT_NODE
        ? mutation.target
        : mutation.target.parentElement;
      return !target?.closest?.(`#${ROW_ID}`) && target?.id !== STYLE_ID;
    });
    if (!externalChange) return;
    clearTimeout(reconcileTimer);
    reconcileTimer = setTimeout(reconcile, 200);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  setInterval(reconcile, CONFIG.HEALTH_CHECK_MS);
  setInterval(() => fetchUsage(false), CONFIG.REFRESH_MS);
  setInterval(() => render(), CONFIG.COUNTDOWN_MS);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      reconcile();
      fetchUsage(false);
    }
  });

  reconcile();
})();
