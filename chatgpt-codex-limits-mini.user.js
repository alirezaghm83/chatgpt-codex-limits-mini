// ==UserScript==
// @name         ChatGPT Codex Limits Mini
// @namespace    alirezadigi.chatgpt.codex-limits
// @version      0.14.2
// @description  Shows the remaining 5-hour and weekly limits in the ChatGPT sidebar.
// @license      MIT
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// @icon         data:image/png;base64,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
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

  // Change to 'horizontal' to show 5h and Weekly side by side.
  const LIMITS_LAYOUT = 'vertical';
  // Applies only to the vertical layout; keeps the labels and percentages readable.
  const VERTICAL_DENSITY = 'compact'; // 'compact' or 'comfortable'

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
      #${ROW_ID} {
        appearance:none;
        box-sizing:border-box;
        width:calc(100% - 0.875rem);
        min-width:0;
        height:auto;
        min-height:58px;
        margin-block:0 0.5rem;
        margin-inline:0.5rem 0.375rem;
        padding:9px 11px;
        border:0;
        border-radius:10px;
        cursor:pointer;
        font:inherit;
        color:var(--text-primary, var(--ce-text-primary, currentColor));
        text-align:inherit;
        transition:background-color 160ms ease, color 160ms ease;
      }
      #${ROW_ID}:hover { background:var(--sidebar-surface-secondary, rgba(127,127,127,.12)); }
      #${ROW_ID}:focus-visible { outline:2px solid var(--interactive-label-primary-default, #10a37f); outline-offset:-2px; }
      #${ROW_ID} .clm-content { display:flex; align-items:center; gap:12px; min-width:0; width:100%; }
      #${ROW_ID} .clm-icon { display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; width:20px; height:20px; opacity:.9; }
      #${ROW_ID} .clm-icon svg { width:20px; height:20px; }
      #${ROW_ID} .clm-values { display:grid; align-items:start; min-width:0; width:100%; font-variant-numeric:tabular-nums; }
      #${ROW_ID}[data-clm-layout="horizontal"] .clm-values { grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:14px; }
      #${ROW_ID}[data-clm-layout="vertical"] .clm-content { align-items:flex-start; }
      #${ROW_ID}[data-clm-layout="vertical"] .clm-icon { margin-top:1px; }
      #${ROW_ID}[data-clm-layout="vertical"] .clm-values { grid-template-columns:minmax(0,1fr); gap:10px; }
      #${ROW_ID}[data-clm-layout="vertical"] .clm-limit + .clm-limit { padding-top:10px; border-top:1px solid rgba(127,127,127,.16); }
      #${ROW_ID}[data-clm-layout="vertical"][data-clm-density="compact"] { padding-block:7px; }
      #${ROW_ID}[data-clm-layout="vertical"][data-clm-density="compact"] .clm-values { gap:6px; }
      #${ROW_ID}[data-clm-layout="vertical"][data-clm-density="compact"] .clm-limit + .clm-limit { padding-top:6px; }
      #${ROW_ID}[data-clm-layout="vertical"][data-clm-density="compact"] .clm-progress { height:3px; margin-top:4px; }
      #${ROW_ID}[data-clm-layout="vertical"][data-clm-density="compact"] .clm-reset { margin-top:3px; }
      #${ROW_ID} .clm-limit { display:flex; flex-direction:column; align-items:stretch; min-width:0; line-height:1.15; white-space:nowrap; --clm-accent:#10a37f; }
      #${ROW_ID} .clm-limit[data-tone="low"] { --clm-accent:#d97706; }
      #${ROW_ID} .clm-limit[data-tone="critical"] { --clm-accent:#dc2626; }
      #${ROW_ID} .clm-main { display:flex; align-items:baseline; justify-content:space-between; gap:6px; min-width:0; font-size:13px; }
      #${ROW_ID} .clm-label { overflow:hidden; text-overflow:ellipsis; opacity:.82; font-weight:500; }
      #${ROW_ID} .clm-remaining { flex:0 0 auto; opacity:1; font-size:13.5px; font-weight:750; letter-spacing:-.01em; color:var(--text-primary, currentColor); }
      #${ROW_ID} .clm-progress { display:block; position:relative; overflow:hidden; width:100%; height:4px; margin-top:6px; border-radius:999px; background:rgba(127,127,127,.2); }
      #${ROW_ID} .clm-progress-fill { display:block; width:0; height:100%; border-radius:inherit; background:var(--clm-accent); transition:width 280ms ease, background-color 180ms ease; }
      #${ROW_ID} .clm-reset { margin-top:5px; overflow:hidden; text-overflow:ellipsis; font-size:10.5px; line-height:1.15; opacity:.58; font-weight:400; }
      #${ROW_ID} .clm-status { display:flex; align-items:center; min-height:28px; font-size:12px; opacity:.68; }
      #${ROW_ID}.clm-collapsed .clm-values,
      #${ROW_ID}.clm-collapsed .clm-status { display:none !important; }
      #${ROW_ID}.clm-collapsed { width:32px; min-width:32px; height:32px; min-height:32px; margin:0 auto .5rem; padding:0; justify-content:center; border-radius:8px; }
      #${ROW_ID}.clm-collapsed .clm-content { justify-content:center; gap:0; }
      #${ROW_ID}.clm-collapsed .clm-icon,
      #${ROW_ID}.clm-collapsed .clm-icon svg { width:18px; height:18px; }
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

    const progress = document.createElement('span');
    progress.className = 'clm-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', `${label} remaining`);
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');

    const progressFill = document.createElement('span');
    progressFill.className = 'clm-progress-fill';
    progress.append(progressFill);

    main.append(labelNode, remaining);
    root.append(main, progress, reset);
    return { root, remaining, reset, progress, progressFill };
  }

  function applySourceAppearance(row, source, mode) {
    row.className = typeof source.className === 'string' ? source.className : '';
    row.classList.add('clm-row');
    row.classList.remove('ce-nav-trigger-collapsed', 'clm-collapsed');
    row.dataset.clmMode = mode;
    row.dataset.clmLayout = LIMITS_LAYOUT === 'horizontal' ? 'horizontal' : 'vertical';
    row.dataset.clmDensity = VERTICAL_DENSITY === 'comfortable' ? 'comfortable' : 'compact';
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

  function progressTone(value) {
    if (!Number.isFinite(value)) return 'unknown';
    if (value <= 20) return 'critical';
    if (value <= 50) return 'low';
    return 'healthy';
  }

  function renderLimit(uiLimit, usageWindow, now) {
    const remaining = usageWindow?.remaining;
    setText(uiLimit.remaining, formatRemaining(remaining));
    setText(uiLimit.reset, formatCountdown(usageWindow?.resetAt, now));
    uiLimit.root.dataset.tone = progressTone(remaining);
    const progressValue = Number.isFinite(remaining)
      ? Math.max(0, Math.min(100, remaining))
      : 0;
    const progressWidth = `${progressValue}%`;
    if (uiLimit.progressFill.style.width !== progressWidth) {
      uiLimit.progressFill.style.width = progressWidth;
    }
    if (Number.isFinite(remaining)) {
      uiLimit.progress.setAttribute('aria-valuenow', String(progressValue));
    } else {
      uiLimit.progress.removeAttribute('aria-valuenow');
    }
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

  window[RUNTIME_KEY] = Object.freeze({ version: '0.14.2', destroy });
  reconcile();
})();
