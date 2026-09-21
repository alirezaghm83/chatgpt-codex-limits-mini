// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.12.0
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

  const RUNTIME_KEY = '__chatgptCodexLimitsMiniRuntime';
  const ROW_ID = 'codex-limits-native-row';
  const STYLE_ID = 'codex-limits-native-style';
  const PROFILE_SELECTOR = '[data-testid="accounts-profile-button"]';
  const EXPORTER_SELECTOR = '.ce-nav-trigger';
  const MOUNT_SELECTOR = `${PROFILE_SELECTOR}, ${EXPORTER_SELECTOR}`;

  const CONFIG = Object.freeze({
    USAGE_PATH: '/backend-api/wham/usage',
    REFRESH_MS: 2 * 60 * 1000,
    HEALTH_CHECK_MS: 15 * 1000,
    COUNTDOWN_MS: 30 * 1000,
    FETCH_TIMEOUT_MS: 15 * 1000,
    TOKEN_FALLBACK_TTL_MS: 4 * 60 * 1000,
    FIVE_HOURS_SECONDS: 5 * 60 * 60,
    WEEK_SECONDS: 7 * 24 * 60 * 60,
  });

  window[RUNTIME_KEY]?.destroy?.();

  const state = {
    destroyed: false,
    ui: null,
    mode: null,
    source: null,
    anchor: null,
    usage: null,
    error: null,
    isFetching: false,
    refreshQueued: false,
    lastAttemptAt: 0,
    lastSuccessAt: 0,
    token: null,
    tokenExpiresAt: 0,
    abortController: null,
    reconcileTimer: null,
    resizeFrame: null,
    intervals: new Set(),
  };

  let domObserver;
  let sourceObserver;
  let resizeObserver;

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${ROW_ID} { appearance:none; cursor:pointer; font:inherit; text-align:inherit; }
      #${ROW_ID} .clm-content { display:flex; align-items:center; gap:10px; min-width:0; width:100%; }
      #${ROW_ID} .clm-icon { display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; width:18px; height:18px; }
      #${ROW_ID} .clm-values { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; min-width:0; width:100%; font-variant-numeric:tabular-nums; }
      #${ROW_ID} .clm-limit { display:flex; flex-direction:column; align-items:flex-start; min-width:0; line-height:1.05; white-space:nowrap; }
      #${ROW_ID} .clm-main { display:flex; align-items:baseline; gap:4px; font-size:11px; }
      #${ROW_ID} .clm-label { opacity:.72; font-weight:400; }
      #${ROW_ID} .clm-remaining { opacity:1; font-weight:700; }
      #${ROW_ID} .clm-reset { margin-top:3px; font-size:9px; opacity:.42; font-weight:400; }
      #${ROW_ID} .clm-status { display:flex; align-items:center; min-height:18px; font-size:10px; opacity:.55; }
      #${ROW_ID}.clm-collapsed .clm-values,
      #${ROW_ID}.clm-collapsed .clm-status { display:none !important; }
      #${ROW_ID} [hidden] { display:none !important; }
      #${ROW_ID} .clm-spinner { display:inline-block; width:10px; height:10px; border:1.5px solid currentColor; border-right-color:transparent; border-radius:50%; animation:clm-spin .7s linear infinite; opacity:.65; }
      @keyframes clm-spin { to { transform:rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  function isOwnElement(element) {
    return Boolean(element?.closest?.(`#${ROW_ID}`));
  }

  function isVisible(element) {
    if (!element?.isConnected || isOwnElement(element)) return false;
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 &&
      style.display !== 'none' && style.visibility !== 'hidden';
  }

  function bestVisible(selector) {
    const candidates = [...document.querySelectorAll(selector)].filter(isVisible);
    return candidates.sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (bRect.width * bRect.height) - (aRect.width * aRect.height);
    })[0] || null;
  }

  function getProfileButton() {
    return bestVisible(PROFILE_SELECTOR);
  }

  function getExporterTrigger() {
    return bestVisible(EXPORTER_SELECTOR);
  }

  function findProfileBranch(parent, profile) {
    return [...parent.children].find(child => child === profile || child.contains(profile)) || null;
  }

  function findExporterAnchor(trigger) {
    const profile = getProfileButton();
    let node = trigger;

    for (let depth = 0; depth < 12 && node?.parentElement; depth += 1) {
      if (node instanceof HTMLElement && node.style.zIndex === '99') return node;
      const parent = node.parentElement;
      const profileBranch = profile ? findProfileBranch(parent, profile) : null;
      if (profileBranch && profileBranch !== node) return node;
      if (parent === document.body) break;
      node = parent;
    }

    node = trigger;
    for (let depth = 0; depth < 5 && node.parentElement; depth += 1) {
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

  function getMountTarget() {
    const exporter = getExporterTrigger();
    if (exporter) {
      const anchor = findExporterAnchor(exporter);
      if (anchor?.parentElement) return { mode: 'exporter', source: exporter, anchor };
    }

    const profile = getProfileButton();
    if (!profile) return null;
    const anchor = profile.closest('button, a, [role="button"]') || profile;
    return anchor.parentElement
      ? { mode: 'standalone', source: anchor, anchor }
      : null;
  }

  function iconSvg() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 17.5V14a8 8 0 0 1 16 0v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 17.5h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 14l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/></svg>`;
  }

  function createLimit(label) {
    const root = document.createElement('span');
    root.className = 'clm-limit';
    const main = document.createElement('span');
    main.className = 'clm-main';
    const labelNode = document.createElement('span');
    labelNode.className = 'clm-label';
    labelNode.textContent = label;
    const remaining = document.createElement('strong');
    remaining.className = 'clm-remaining';
    remaining.textContent = '—';
    const reset = document.createElement('span');
    reset.className = 'clm-reset';
    reset.textContent = '↻ —';
    main.append(labelNode, remaining);
    root.append(main, reset);
    return { root, remaining, reset };
  }

  function applySourceAppearance(row, source, mode) {
    row.className = typeof source.className === 'string' ? source.className : '';
    row.classList.add('clm-row');
    row.classList.remove('ce-nav-trigger-collapsed', 'clm-collapsed');
    row.dataset.clmMode = mode;
  }

  function createUi(target) {
    const row = document.createElement('button');
    row.type = 'button';
    row.id = ROW_ID;
    row.setAttribute('aria-label', 'Usage limits; click to refresh');
    row.title = 'Click to refresh usage limits';
    applySourceAppearance(row, target.source, target.mode);

    const content = document.createElement('span');
    content.className = 'clm-content';
    const icon = document.createElement('span');
    icon.className = 'clm-icon';
    icon.innerHTML = iconSvg();
    const values = document.createElement('span');
    values.className = 'clm-values';
    const five = createLimit('5h');
    const week = createLimit('Weekly');
    values.append(five.root, week.root);
    const status = document.createElement('span');
    status.className = 'clm-status';
    status.hidden = true;
    content.append(icon, values, status);
    row.append(content);

    row.addEventListener('click', () => fetchUsage(true));
    row.addEventListener('mouseenter', event => event.stopPropagation(), true);
    row.addEventListener('pointerenter', event => event.stopPropagation(), true);
    return { row, values, status, five, week };
  }

  function setText(node, value) {
    if (node.textContent !== value) node.textContent = value;
  }

  function setHidden(node, hidden) {
    if (node.hidden !== hidden) node.hidden = hidden;
  }

  function formatRemaining(value) {
    if (!Number.isFinite(value)) return '—';
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
  }

  function formatCountdown(resetAt, now = Date.now()) {
    if (!Number.isFinite(resetAt)) return '↻ —';
    let seconds = Math.max(0, Math.ceil((resetAt - now) / 1000));
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

  function renderLimit(uiLimit, usageWindow, now) {
    setText(uiLimit.remaining, formatRemaining(usageWindow?.remaining));
    setText(uiLimit.reset, formatCountdown(usageWindow?.resetAt, now));
    const title = resetTitle(usageWindow?.resetAt);
    if (uiLimit.root.title !== title) uiLimit.root.title = title;
  }

  function render() {
    const ui = state.ui;
    if (!ui?.row.isConnected) return;

    if (!state.usage) {
      setHidden(ui.values, true);
      setHidden(ui.status, false);
      if (state.isFetching) {
        if (!ui.status.querySelector('.clm-spinner')) {
          const spinner = document.createElement('span');
          spinner.className = 'clm-spinner';
          ui.status.replaceChildren(spinner);
        }
      } else {
        setText(ui.status, state.error ? 'Unavailable' : '…');
      }
      return;
    }

    setHidden(ui.status, true);
    setHidden(ui.values, false);
    const now = Date.now();
    renderLimit(ui.five, state.usage.five, now);
    renderLimit(ui.week, state.usage.week, now);

    ui.row.title = state.error
      ? 'Last refresh failed; showing the last known values. Click to retry.'
      : `Last updated ${new Date(state.lastSuccessAt).toLocaleTimeString()}; click to refresh.`;

    const fiveText = formatRemaining(state.usage.five?.remaining);
    const weekText = formatRemaining(state.usage.week?.remaining);
    const ariaLabel = `5-hour ${fiveText} remaining; weekly ${weekText} remaining; click to refresh`;
    if (ui.row.getAttribute('aria-label') !== ariaLabel) ui.row.setAttribute('aria-label', ariaLabel);
  }

  function scheduleCollapsedSync() {
    cancelAnimationFrame(state.resizeFrame);
    state.resizeFrame = requestAnimationFrame(syncCollapsed);
  }

  function syncCollapsed() {
    const { ui, source, mode } = state;
    if (!ui?.row.isConnected || !source?.isConnected) return;

    let collapsed;
    if (mode === 'exporter') {
      collapsed = source.classList.contains('ce-nav-trigger-collapsed');
      ui.row.classList.toggle('ce-nav-trigger-collapsed', collapsed);
    } else {
      const sidebar = ui.row.closest('nav, aside, [aria-label="Sidebar"], [data-testid="sidebar"]');
      const parentWidth = ui.row.parentElement?.getBoundingClientRect().width || 0;
      const sidebarWidth = sidebar?.getBoundingClientRect().width || parentWidth;
      collapsed = (parentWidth > 0 && parentWidth < 96) ||
        (sidebarWidth > 0 && sidebarWidth < 96);
    }
    ui.row.classList.toggle('clm-collapsed', collapsed);
  }

  function bindSourceObservers(target) {
    if (state.source === target.source && state.anchor === target.anchor) return;
    sourceObserver?.disconnect();
    resizeObserver?.disconnect();
    state.source = target.source;
    state.anchor = target.anchor;

    sourceObserver = new MutationObserver(scheduleCollapsedSync);
    sourceObserver.observe(target.source, { attributes: true, attributeFilter: ['class', 'style'] });

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleCollapsedSync);
      const sidebar = state.ui?.row.closest('nav, aside, [aria-label="Sidebar"], [data-testid="sidebar"]');
      for (const element of [target.source, target.anchor.parentElement, sidebar]) {
        if (element) resizeObserver.observe(element);
      }
    }
  }

  function mount() {
    if (state.destroyed) return null;
    addStyles();
    const target = getMountTarget();
    if (!target) return state.ui?.row.isConnected ? state.ui.row : null;

    const sourceChanged = state.source !== target.source;
    if (!state.ui?.row.isConnected) {
      state.ui = createUi(target);
      state.mode = target.mode;
    } else if (state.mode !== target.mode || sourceChanged) {
      applySourceAppearance(state.ui.row, target.source, target.mode);
      state.mode = target.mode;
    }

    const { row } = state.ui;
    const parent = target.anchor.parentElement;
    if (parent && (row.parentElement !== parent || row.nextSibling !== target.anchor)) {
      parent.insertBefore(row, target.anchor);
    }

    bindSourceObservers(target);
    syncCollapsed();
    render();
    return row;
  }

  function deepFindToken(value, seen = new Set()) {
    if (!value || typeof value !== 'object' || seen.has(value)) return null;
    seen.add(value);
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === 'string' &&
          /access.*token|token.*access/i.test(key) &&
          item.split('.').length === 3) return item;
      if (item && typeof item === 'object') {
        const found = deepFindToken(item, seen);
        if (found) return found;
      }
    }
    return null;
  }

  function tokenExpiry(token) {
    try {
      const payload = token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/');
      const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');
      const exp = JSON.parse(atob(padded)).exp;
      return Number.isFinite(exp) ? exp * 1000 : 0;
    } catch {
      return 0;
    }
  }

  async function getAccessToken(signal) {
    if (state.token && Date.now() < state.tokenExpiresAt - 60_000) return state.token;
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
        cache: 'no-store',
        signal,
      });
      if (!response.ok) return null;
      const token = deepFindToken(await response.json());
      if (!token) return null;
      state.token = token;
      state.tokenExpiresAt = tokenExpiry(token) || Date.now() + CONFIG.TOKEN_FALLBACK_TTL_MS;
      return token;
    } catch (error) {
      if (error.name !== 'AbortError') console.debug('[Usage Limits Mini] Session lookup failed', error);
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

  function windowSeconds(object) {
    return firstFinite([
      object.limit_window_seconds,
      object.window_seconds,
      object.window?.seconds,
      object.limit_window?.seconds,
    ]);
  }

  function usedPercent(object) {
    return firstFinite([
      object.used_percent,
      object.utilization_percent,
      object.usage_percent,
      object.percent_used,
    ]);
  }

  function resetAt(object, now) {
    const raw = object.reset_at ?? object.resetAt ?? object.resets_at ??
      object.window?.reset_at ?? object.limit_window?.reset_at;
    if (raw != null && raw !== '') {
      if (typeof raw === 'number' || /^\d+(\.\d+)?$/.test(String(raw))) {
        let timestamp = Number(raw);
        if (Number.isFinite(timestamp)) {
          if (timestamp > 1e14) timestamp /= 1000;
          else if (timestamp < 1e12) timestamp *= 1000;
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
    return after != null && after >= 0 ? now + after * 1000 : null;
  }

  function findWindow(payload, targetSeconds, now) {
    let best = null;
    let bestDistance = Infinity;
    for (const object of allObjects(payload)) {
      const seconds = windowSeconds(object);
      const used = usedPercent(object);
      if (seconds == null || used == null) continue;
      const distance = Math.abs(seconds - targetSeconds);
      const tolerance = Math.max(120, targetSeconds * 0.03);
      if (distance < bestDistance && distance <= tolerance) {
        bestDistance = distance;
        best = {
          remaining: Math.max(0, Math.min(100, 100 - used)),
          resetAt: resetAt(object, now),
        };
      }
    }
    return best;
  }

  function parseUsage(payload, now = Date.now()) {
    return {
      five: findWindow(payload, CONFIG.FIVE_HOURS_SECONDS, now),
      week: findWindow(payload, CONFIG.WEEK_SECONDS, now),
    };
  }

  async function requestUsage(signal) {
    const send = token => {
      const headers = { accept: 'application/json' };
      if (token) headers.authorization = `Bearer ${token}`;
      return fetch(CONFIG.USAGE_PATH, {
        credentials: 'include',
        cache: 'no-store',
        headers,
        signal,
      });
    };

    let token = await getAccessToken(signal);
    let response = await send(token);
    if (response.status === 401 && token && !signal.aborted) {
      state.token = null;
      state.tokenExpiresAt = 0;
      token = await getAccessToken(signal);
      response = await send(token);
    }
    return response;
  }

  async function fetchUsage(force = false) {
    if (state.destroyed) return;
    if (state.isFetching) {
      if (force) state.refreshQueued = true;
      return;
    }

    const now = Date.now();
    if (!force && now - state.lastAttemptAt < CONFIG.REFRESH_MS) return;
    state.lastAttemptAt = now;
    state.isFetching = true;
    state.error = null;
    render();

    const controller = new AbortController();
    state.abortController = controller;
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT_MS);

    try {
      const response = await requestUsage(controller.signal);
      if (!response.ok) throw new Error(`usage ${response.status}`);

      const parsed = parseUsage(await response.json());
      if (!parsed.five && !parsed.week) throw new Error('rate-limit windows not found');
      state.usage = parsed;
      state.lastSuccessAt = Date.now();
    } catch (error) {
      state.error = error;
      if (error.name !== 'AbortError') console.warn('[Usage Limits Mini]', error);
    } finally {
      clearTimeout(timeoutId);
      if (state.abortController === controller) state.abortController = null;
      state.isFetching = false;
      render();
      if (state.refreshQueued && !state.destroyed) {
        state.refreshQueued = false;
        queueMicrotask(() => fetchUsage(true));
      }
    }
  }

  function isExternalCandidate(element) {
    return element instanceof Element && !isOwnElement(element) && element.matches(MOUNT_SELECTOR);
  }

  function subtreeHasExternalCandidate(node) {
    if (!(node instanceof Element) || node.id === ROW_ID) return false;
    if (isExternalCandidate(node)) return true;
    return [...node.querySelectorAll(MOUNT_SELECTOR)].some(isExternalCandidate);
  }

  function mutationAffectsMount(mutation) {
    for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
      if (subtreeHasExternalCandidate(node)) return true;
      if (node instanceof Element && state.anchor &&
          (node === state.anchor || node.contains(state.anchor))) return true;
      if (node instanceof Element && state.ui?.row &&
          (node === state.ui.row || node.contains(state.ui.row))) return true;
    }
    return false;
  }

  function scheduleReconcile() {
    clearTimeout(state.reconcileTimer);
    state.reconcileTimer = setTimeout(reconcile, 200);
  }

  function reconcile() {
    const row = mount();
    if (row) fetchUsage(false);
  }

  function addInterval(callback, delay) {
    const id = setInterval(callback, delay);
    state.intervals.add(id);
  }

  function destroy() {
    if (state.destroyed) return;
    state.destroyed = true;
    domObserver?.disconnect();
    sourceObserver?.disconnect();
    resizeObserver?.disconnect();
    state.abortController?.abort();
    clearTimeout(state.reconcileTimer);
    cancelAnimationFrame(state.resizeFrame);
    for (const id of state.intervals) clearInterval(id);
    window.removeEventListener('resize', scheduleCollapsedSync);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    state.ui?.row.remove();
    document.getElementById(STYLE_ID)?.remove();
    if (window[RUNTIME_KEY]?.destroy === destroy) delete window[RUNTIME_KEY];
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      reconcile();
      fetchUsage(false);
    }
  }

  domObserver = new MutationObserver(mutations => {
    if (mutations.some(mutationAffectsMount)) scheduleReconcile();
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', scheduleCollapsedSync, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
  addInterval(reconcile, CONFIG.HEALTH_CHECK_MS);
  addInterval(() => fetchUsage(false), CONFIG.REFRESH_MS);
  addInterval(render, CONFIG.COUNTDOWN_MS);

  window[RUNTIME_KEY] = Object.freeze({ version: '0.12.0', destroy });
  reconcile();
})();
