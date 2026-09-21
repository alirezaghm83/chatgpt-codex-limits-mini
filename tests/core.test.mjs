import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../chatgpt-codex-limits-mini.user.js', import.meta.url), 'utf8');

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `function ${name} must exist`);
  const brace = source.indexOf('{', start);
  let depth = 0;
  for (let index = brace; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`function ${name} is not balanced`);
}

function loadCore() {
  const names = [
    'formatRemaining',
    'formatCountdown',
    'formatAge',
    'lowestUsageWindow',
    'progressTone',
    'normalizeHistory',
    'formatHistoryDuration',
    'historyTrend',
    'csvCell',
    'historyToCsv',
    'allObjects',
    'firstFinite',
    'windowSeconds',
    'usedPercent',
    'resetAt',
    'findWindow',
    'parseUsage',
  ];
  const code = `
    const CONFIG = {
      FIVE_HOURS_SECONDS: 18000,
      WEEK_SECONDS: 604800,
    };
    const SETTINGS = {
      TONE_LOW_AT_OR_BELOW: 50,
      TONE_CRITICAL_AT_OR_BELOW: 20,
      HISTORY_RETENTION_DAYS: 14,
      HISTORY_MAX_ENTRIES: 500,
      HISTORY_TREND_HOURS: 6,
    };
    ${names.map(extractFunction).join('\n')}
    globalThis.core = { ${names.join(', ')} };
  `;
  const context = vm.createContext({});
  new vm.Script(code).runInContext(context);
  return context.core;
}

test('userscript metadata and anti-regression invariants', () => {
  assert.match(source, /\/\/ @version\s+0\.16\.0/);
  assert.match(source, /@icon\s+data:image\/png;base64,/);
  assert.match(source, /window\[RUNTIME_KEY\]\?\.destroy\?\.\(\)/);
  assert.match(source, /document\.createElement\('button'\)/);
  assert.doesNotMatch(source, /cloneNode\s*\(/);
  assert.doesNotMatch(source, /innerHTML\s*=\s*html/);
  assert.match(source, /className = 'clm-progress'/);
  assert.match(source, /const SETTINGS = Object\.freeze/);
  assert.match(source, /LAYOUT: 'vertical'/);
  assert.match(source, /VERTICAL_DENSITY: 'compact'/);
  assert.match(source, /DISPLAY_MODE: 'full'/);
  assert.match(source, /HISTORY_ENABLED: true/);
  assert.match(source, /HISTORY_PANEL_ENTRIES: 25/);
  assert.match(source, /row\.dataset\.clmLayout = SETTINGS\.LAYOUT === 'horizontal'/);
  assert.match(source, /row\.dataset\.clmDensity = SETTINGS\.VERTICAL_DENSITY === 'comfortable'/);
  assert.match(source, /row\.dataset\.clmDisplay = SETTINGS\.DISPLAY_MODE === 'minimal'/);
  assert.match(source, /values\.append\(five\.root, week\.root\)/);
  assert.match(source, /data-clm-layout="vertical"/);
  assert.match(source, /data-clm-layout="horizontal"/);
  assert.match(source, /data-clm-density="compact"/);
  assert.match(source, /data-clm-layout="vertical"\] \.clm-content \{ align-items:center; \}/);
  assert.match(source, /addEventListener\('contextmenu'/);
  assert.match(source, /localStorage\.setItem\(HISTORY_STORAGE_KEY/);
  assert.match(source, /recordUsageHistory\(parsed, state\.lastSuccessAt\)/);
  assert.match(source, /exportUsageHistory\(history\)/);
  assert.match(source, /Export CSV/);
});

test('embedded icon exactly matches the checked-in 128x128 favicon', async () => {
  const encoded = source.match(/\/\/ @icon\s+data:image\/png;base64,([^\r\n]+)/)?.[1];
  assert.ok(encoded, 'embedded icon data must exist');
  const image = Buffer.from(encoded, 'base64');
  const favicon = await readFile(new URL('../assets/favicon-128.png', import.meta.url));
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.readUInt32BE(16), 128);
  assert.equal(image.readUInt32BE(20), 128);
  assert.equal(image.length, 21_516);
  assert.equal(image[25], 6, 'embedded icon must be RGBA');
  assert.deepEqual(image, favicon);
});

test('project icon and favicon variants have their intended PNG dimensions', async () => {
  const assets = [
    ['project-icon.png', 512],
    ['favicon-128.png', 128],
    ['favicon-32.png', 32],
  ];

  for (const [filename, size] of assets) {
    const image = await readFile(new URL(`../assets/${filename}`, import.meta.url));
    assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(image.readUInt32BE(16), size, `${filename} width`);
    assert.equal(image.readUInt32BE(20), size, `${filename} height`);
    assert.equal(image[25], 6, `${filename} must preserve transparency`);
  }
});

test('remaining percentages are rounded without losing integers', () => {
  const { formatRemaining } = loadCore();
  assert.equal(formatRemaining(68), '68%');
  assert.equal(formatRemaining(68.26), '68.3%');
  assert.equal(formatRemaining(Number.NaN), '—');
});

test('progress tone reflects remaining capacity', () => {
  const { progressTone } = loadCore();
  assert.equal(progressTone(80), 'healthy');
  assert.equal(progressTone(50), 'low');
  assert.equal(progressTone(20), 'critical');
  assert.equal(progressTone(Number.NaN), 'unknown');
});

test('age formatting and lowest-limit selection prioritize current information', () => {
  const { formatAge, lowestUsageWindow } = loadCore();
  const now = 2_000_000_000_000;
  assert.equal(formatAge(now - 30_000, now), 'just now');
  assert.equal(formatAge(now - (8 * 60 * 1000), now), '8m ago');
  assert.equal(formatAge(now - (3 * 60 * 60 * 1000), now), '3h ago');
  assert.equal(lowestUsageWindow({ five: { remaining: 72 }, week: { remaining: 34 } }).key, 'week');
  assert.equal(lowestUsageWindow({ five: { remaining: Number.NaN }, week: null }), null);
});

test('local history is bounded, recent, and exports every record as CSV', () => {
  const { normalizeHistory, historyTrend, csvCell, historyToCsv } = loadCore();
  const now = 2_000_000_000_000;
  const history = normalizeHistory([
    { at: now - (15 * 24 * 60 * 60 * 1000), five: 90, week: 90 },
    { at: now - (2 * 60 * 60 * 1000), five: 80, week: 60 },
    { at: now - (30 * 60 * 1000), five: 70, week: 58 },
  ], now);
  assert.equal(history.length, 2);
  assert.equal(history[0].five, 80);
  assert.match(historyTrend(history, 'five'), /10\.0pp used in 1h/);
  const csv = historyToCsv(history);
  assert.equal(csv.split('\n').length, 3);
  assert.match(csv, /"timestamp_iso","timestamp_local","five_remaining_percent","weekly_remaining_percent"/);
  assert.match(csv, /"2033-05-18T01:33:20\.000Z","[^"]+","80","60"/);
  assert.match(csv, /"2033-05-18T03:03:20\.000Z","[^"]+","70","58"/);
  assert.equal(csvCell('a"b'), '"a""b"');
});

test('countdowns use minute, hour, and day precision', () => {
  const { formatCountdown } = loadCore();
  const now = 2_000_000_000_000;
  assert.equal(formatCountdown(now + (18 * 60 * 1000), now), '↻ 18m');
  assert.equal(formatCountdown(now + ((2 * 60 + 14) * 60 * 1000), now), '↻ 2h 14m');
  assert.equal(formatCountdown(now + ((3 * 24 + 8) * 60 * 60 * 1000), now), '↻ 3d 8h');
  assert.equal(formatCountdown(now + 20_000, now), '↻ now');
});

test('usage parser finds nested 5-hour and weekly windows', () => {
  const { parseUsage } = loadCore();
  const now = 2_000_000_000_000;
  const payload = {
    rate_limit: {
      primary_window: {
        limit_window_seconds: 18_000,
        used_percent: 32,
        reset_at: (now + 7_200_000) / 1000,
      },
      secondary_window: {
        limit_window_seconds: 604_800,
        used_percent: '70.5',
        reset_after_seconds: 86_400,
      },
    },
  };
  const parsed = parseUsage(payload, now);
  assert.equal(parsed.five.remaining, 68);
  assert.equal(parsed.five.resetAt, now + 7_200_000);
  assert.equal(parsed.week.remaining, 29.5);
  assert.equal(parsed.week.resetAt, now + 86_400_000);
});

test('null numeric fields are not misread as zero', () => {
  const { firstFinite } = loadCore();
  assert.equal(firstFinite([null, undefined, '', '12.5']), 12.5);
  assert.equal(firstFinite([null, undefined, '']), null);
});
