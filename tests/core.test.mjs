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
    'progressTone',
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
    ${names.map(extractFunction).join('\n')}
    globalThis.core = { ${names.join(', ')} };
  `;
  const context = vm.createContext({});
  new vm.Script(code).runInContext(context);
  return context.core;
}

test('userscript metadata and anti-regression invariants', () => {
  assert.match(source, /\/\/ @version\s+0\.14\.2/);
  assert.match(source, /@icon\s+data:image\/png;base64,/);
  assert.match(source, /window\[RUNTIME_KEY\]\?\.destroy\?\.\(\)/);
  assert.match(source, /document\.createElement\('button'\)/);
  assert.doesNotMatch(source, /cloneNode\s*\(/);
  assert.doesNotMatch(source, /innerHTML\s*=\s*html/);
  assert.match(source, /className = 'clm-progress'/);
  assert.match(source, /const LIMITS_LAYOUT = 'vertical'/);
  assert.match(source, /const VERTICAL_DENSITY = 'compact'/);
  assert.match(source, /row\.dataset\.clmLayout = LIMITS_LAYOUT === 'horizontal'/);
  assert.match(source, /row\.dataset\.clmDensity = VERTICAL_DENSITY === 'comfortable'/);
  assert.match(source, /values\.append\(five\.root, week\.root\)/);
  assert.match(source, /data-clm-layout="vertical"/);
  assert.match(source, /data-clm-layout="horizontal"/);
  assert.match(source, /data-clm-density="compact"/);
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
