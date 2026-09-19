// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.10.0
// @description  Shows Codex 5-hour and weekly limits as a native ChatGPT sidebar row, with or without Exporter.
// @author       Alireza + ChatGPT
// @license      MIT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// @updateURL    https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js
// ==/UserScript==

(() => {
  'use strict';

  const CONFIG = {
    USAGE_PATH: '/backend-api/wham/usage',
    REFRESH_MS: 2 * 60 * 1000,
    RETRY_MS: 1000,
    COUNTDOWN_MS: 30 * 1000,
    FIVE_HOURS_SECONDS: 5 * 60 * 60,
    WEEK_SECONDS: 7 * 24 * 60 * 60,
  };

  const ROW_ID = 'codex-limits-native-row';
  const STYLE_ID = 'codex-limits-native-style';

  let isFetching = false;
  let lastFetchAt = 0;
  let lastUsage = null;
  let currentMode = null;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${ROW_ID} { cursor: pointer; }
      #${ROW_ID} .codex-limits-content { display:flex; align-items:center; justify-content:space-between; gap:10px; min-width:0; width:100%; }
      #${ROW_ID} .codex-limits-title { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      #${ROW_ID} .codex-limits-values { display:flex; align-items:flex-start; gap:9px; margin-left:auto; flex-shrink:0; font-variant-numeric:tabular-nums; }
      #${ROW_ID} .codex-limit { display:flex; flex-direction:column; align-items:flex-end; line-height:1.05; white-space:nowrap; }
      #${ROW_ID} .codex-limit-main { font-size:11px; opacity:.82; }
      #${ROW_ID} .codex-limit-reset { margin-top:3px; font-size:9px; opacity:.5; font-weight:400; }
      #${ROW_ID}.codex-limits-collapsed .codex-limits-title,
      #${ROW_ID}.codex-limits-collapsed .codex-limits-values { display:none !important; }
      #${ROW_ID} .codex-limits-spinner { display:inline-block; width:10px; height:10px; border:1.5px solid currentColor; border-right-color:transparent; border-radius:50%; animation:codex-spin .7s linear infinite; opacity:.65; }
      @keyframes codex-spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  }

  function scoreElement(el) {
    if (!el || !el.isConnected) return -Infinity;
    let score = 0;
    if (isVisible(el)) score += 100;
    const rect = el.getBoundingClientRect();
    if (rect.left >= 0 && rect.top >= 0) score += 10;
    if (rect.width > 0) score += Math.min(rect.width, 400) / 100;
    return score;
  }

  function bestElement(nodes) {
    return [...nodes].sort((a, b) => scoreElement(b) - scoreElement(a))[0] || null;
  }

  function getProfileButton() {
    return bestElement(document.querySelectorAll('[data-testid="accounts-profile-button"]'));
  }

  function getExporterTrigger() {
    const candidates = [...document.querySelectorAll('.ce-nav-trigger')].filter(el => el.id !== ROW_ID && !el.closest(`#${ROW_ID}`));
    return bestElement(candidates);
  }

  function findInsertWrapper(trigger) {
    if (!trigger) return null;
    let node = trigger;
    for (let i = 0; i < 5 && node?.parentElement; i += 1) {
      const parent = node.parentElement;
      if (parent.hasAttribute?.('data-radix-collection-item') || parent.hasAttribute?.('data-state') || parent.querySelector?.('[data-radix-popper-content-wrapper]')) {
        node = parent;
        continue;
      }
      if (parent.children.length === 1) {
        node = parent;
        continue;
      }
      break;
    }
    return node;
  }

  function stripInteractiveAttributes(root) {
    if (!root) return;
    const nodes = [root, ...root.querySelectorAll('*')];
    for (const node of nodes) {
      node.removeAttribute?.('id');
      node.removeAttribute?.('aria-controls');
      node.removeAttribute?.('aria-expanded');
      node.removeAttribute?.('aria-haspopup');
      node.removeAttribute?.('data-state');
      node.removeAttribute?.('data-radix-collection-item');
      node.removeAttribute?.('data-radix-hover-card-trigger');
      node.removeAttribute?.('data-radix-menu-trigger');
    }
  }

  function iconSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 17.5V14a8 8 0 0 1 16 0v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 17.5h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 14l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></svg>`;
  }

  function createFromExporter(trigger) {
    const row = trigger.cloneNode(true);
    stripInteractiveAttributes(row);
    row.id = ROW_ID;
    row.classList.remove('ce-nav-trigger-collapsed');
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.title = 'Codex limits — click to refresh';

    const iconHolder = row.querySelector('svg')?.parentElement;
    if (iconHolder) iconHolder.innerHTML = iconSvg();

    const text = row.querySelector('.ce-menu-item-text') || row.querySelector('span');
    if (text) {
      text.classList.add('codex-limits-title');
      text.textContent = 'Codex limits';
    }

    const contentHost = text?.parentElement || row;
    if (contentHost && !contentHost.classList.contains('codex-limits-content')) contentHost.classList.add('codex-limits-content');
    const values = document.createElement('span');
    values.className = 'codex-limits-values';
    contentHost.appendChild(values);
    return row;
  }

  function createStandalone(profile) {
    const source = profile.closest('button, a, [role="button"]') || profile;
    const row = source.cloneNode(true);
    stripInteractiveAttributes(row);
    row.id = ROW_ID;
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.title = 'Codex limits — click to refresh';

    const avatar = row.querySelector('img');
    if (avatar) {
      const holder = avatar.parentElement;
      if (holder) holder.innerHTML = iconSvg();
    } else {
      const svg = row.querySelector('svg');
      if (svg?.parentElement) svg.parentElement.innerHTML = iconSvg();
    }

    const spans = [...row.querySelectorAll('span')].filter(el => (el.textContent || '').trim());
    const text = spans[0];
    if (text) {
      text.textContent = 'Codex limits';
      text.classList.add('codex-limits-title');
    }
    const host = text?.parentElement || row;
    host.classList.add('codex-limits-content');
    const values = document.createElement('span');
    values.className = 'codex-limits-values';
    host.appendChild(values);
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
    row.addEventListener('mouseenter', event => event.stopPropagation(), true);
    row.addEventListener('pointerenter', event => event.stopPropagation(), true);
  }

  function mount() {
    addStyles();
    const existing = document.getElementById(ROW_ID);
    const exporter = getExporterTrigger();
    const desiredMode = exporter ? 'exporter' : 'standalone';

    if (existing && existing.isConnected && currentMode === desiredMode) {
      syncCollapsed(existing, exporter);
      render();
      return existing;
    }
    existing?.remove();

    let row = null;
    if (exporter) {
      row = createFromExporter(exporter);
      const wrapper = findInsertWrapper(exporter);
      wrapper?.parentElement?.insertBefore(row, wrapper);
      currentMode = 'exporter';
    } else {
      const profile = getProfileButton();
      if (!profile) return null;
      row = createStandalone(profile);
      const wrapper = profile.closest('button, a, [role="button"]') || profile;
      wrapper.parentElement?.insertBefore(row, wrapper);
      currentMode = 'standalone';
    }

    if (!row?.isConnected) return null;
    bindRow(row);
    syncCollapsed(row, exporter);
    render();
    return row;
  }

  function syncCollapsed(row, exporter) {
    if (!row) return;
    let collapsed = false;
    if (exporter) collapsed = exporter.classList.contains('ce-nav-trigger-collapsed');
    else {
      const sidebar = row.closest('nav, aside, [data-testid*="sidebar"]');
      const rect = sidebar?.getBoundingClientRect();
      collapsed = !!rect && rect.width < 100;
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
    const response = await fetch('/api/auth/session', { credentials: 'include', cache: 'no-store' });
    if (!response.ok) throw new Error(`session ${response.status}`);
    const session = await response.json();
    return deepFindToken(session);
  }

  function allObjects(value, out = [], seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return out;
    seen.add(value);
    out.push(value);
    for (const item of Object.values(value)) allObjects(item, out, seen);
    return out;
  }

  function secondsFor(obj) {
    const candidates = [obj.limit_window_seconds, obj.window_seconds, obj.window?.seconds, obj.limit_window?.seconds];
    return candidates.map(Number).find(Number.isFinite) || null;
  }

  function usedFor(obj) {
    const candidates = [obj.used_percent, obj.utilization_percent, obj.usage_percent, obj.percent_used];
    return candidates.map(Number).find(Number.isFinite);
  }

  function resetAtFor(obj) {
    const raw = obj.reset_at ?? obj.resetAt ?? obj.resets_at ?? obj.window?.reset_at ?? obj.limit_window?.reset_at;
    if (raw != null) {
      if (typeof raw === 'number' || /^\d+(\.\d+)?$/.test(String(raw))) {
        let n = Number(raw);
        if (Number.isFinite(n)) {
          if (n < 1e12) n *= 1000;
          return n;
        }
      }
      const parsed = Date.parse(raw);
      if (Number.isFinite(parsed)) return parsed;
    }
    const after = Number(obj.reset_after_seconds ?? obj.resetAfterSeconds ?? obj.window?.reset_after_seconds);
    if (Number.isFinite(after)) return Date.now() + after * 1000;
    return null;
  }

  function findWindow(payload, targetSeconds) {
    let best = null;
    let bestDistance = Infinity;
    for (const obj of allObjects(payload)) {
      const seconds = secondsFor(obj);
      const used = usedFor(obj);
      if (!Number.isFinite(seconds) || !Number.isFinite(used)) continue;
      const distance = Math.abs(seconds - targetSeconds);
      if (distance < bestDistance && distance <= Math.max(120, targetSeconds * .03)) {
        bestDistance = distance;
        best = { seconds, used, remaining: Math.max(0, Math.min(100, 100 - used)), resetAt: resetAtFor(obj) };
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
    if (isFetching) return;
    if (!force && Date.now() - lastFetchAt < CONFIG.REFRESH_MS) return;
    isFetching = true;
    render(true);
    try {
      const token = await getAccessToken();
      const headers = { accept: 'application/json' };
      if (token) headers.authorization = `Bearer ${token}`;
      const response = await fetch(CONFIG.USAGE_PATH, { credentials: 'include', cache: 'no-store', headers });
      if (!response.ok) throw new Error(`usage ${response.status}`);
      const payload = await response.json();
      const parsed = parseUsage(payload);
      if (!parsed.five && !parsed.week) throw new Error('rate-limit windows not found');
      lastUsage = parsed;
      lastFetchAt = Date.now();
    } catch (error) {
      console.warn('[Codex Limits Mini]', error);
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
    if (!Number.isFinite(resetAt)) return 'Reset time unavailable';
    return `Resets ${new Date(resetAt).toLocaleString()}`;
  }

  function limitHtml(label, window) {
    if (!window) return `<span class="codex-limit"><span class="codex-limit-main">${label} —</span><span class="codex-limit-reset">↻ —</span></span>`;
    return `<span class="codex-limit" title="${resetTitle(window.resetAt).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"><span class="codex-limit-main">${label} ${formatRemaining(window.remaining)}</span><span class="codex-limit-reset">${formatCountdown(window.resetAt)}</span></span>`;
  }

  function render(loading = false) {
    const row = document.getElementById(ROW_ID);
    if (!row) return;
    const values = row.querySelector('.codex-limits-values');
    if (!values) return;
    if (loading && !lastUsage) {
      values.innerHTML = '<span class="codex-limits-spinner" aria-label="Loading"></span>';
      return;
    }
    if (lastUsage?.error) {
      values.textContent = 'Unavailable';
      return;
    }
    if (!lastUsage) {
      values.textContent = '…';
      return;
    }
    values.innerHTML = limitHtml('5h', lastUsage.five) + limitHtml('Weekly', lastUsage.week);
  }

  function reconcile() {
    const row = mount();
    if (row) fetchUsage(false);
  }

  let mutationTimer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(mutationTimer);
    mutationTimer = setTimeout(reconcile, 120);
  });

  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  setInterval(reconcile, CONFIG.RETRY_MS);
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
