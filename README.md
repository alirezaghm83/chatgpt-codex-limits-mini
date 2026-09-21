<p align="center">
  <img src="assets/icon-128.png" width="96" height="96" alt="Usage Limits Mini icon">
</p>

# ChatGPT Codex Limits Mini

A lightweight Tampermonkey userscript that shows the remaining **5-hour** and **weekly** limits directly in the ChatGPT sidebar.

## Features

- Shows the remaining percentage in bold for the 5-hour and weekly windows
- Uses the full Exporter-style sidebar width with larger, higher-contrast typography
- Shows a remaining-capacity progress bar for each window, with green/amber/red states
- Shows a muted live reset countdown under each limit (`↻ 2h 14m`, `↻ 3d 8h`)
- Refreshes usage automatically every 2 minutes
- Updates countdowns locally without extra API requests
- Click the row to force-refresh usage
- Handles ChatGPT sidebar collapse/expand state
- Integrates visually with **ChatGPT Exporter** when installed
- Falls back to a standalone native-looking sidebar row when Exporter is absent
- Avoids triggering Exporter's Radix HoverCard when hovering the limits row
- Keeps one stable sidebar row and moves it instead of destroying/recreating it
- Filters DOM mutations so normal ChatGPT message streaming does not trigger reconciliation
- Cleans up timers, observers, and in-flight requests if the userscript is reloaded
- Caches the session token until shortly before expiry and retries once after an authentication failure
- Embeds the 128×128 PNG icon directly in userscript metadata, avoiding external icon-fetch and cache failures

## Installation

### One-click install

**[Install with Tampermonkey](https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js)**

Open the link above with Tampermonkey installed. Tampermonkey should recognize the `.user.js` file and show its installation screen.

The script declares the GitHub Raw URL as both `@downloadURL` and `@updateURL`, so compatible userscript managers can detect future version bumps pushed to `main`.

### Manual install

1. Install Tampermonkey or another compatible userscript manager.
2. Open `chatgpt-codex-limits-mini.user.js`.
3. Create a new userscript and paste the file contents.
4. Open or refresh ChatGPT.

## How it works

The script reads the current ChatGPT session when available and requests:

```text
/backend-api/wham/usage
```

It identifies the 5-hour and 7-day rate-limit windows by their `limit_window_seconds` values, converts `used_percent` to the remaining percentage, and reads the reset timestamp to maintain a local countdown.

For sidebar placement, the script prefers ChatGPT Exporter's `.ce-nav-trigger` when present so the row inherits the same outer layout. Otherwise it inserts a native-looking row immediately above ChatGPT's profile section. It copies only safe presentation classes into a newly created button—never the profile/Exporter DOM or attributes—so profile names, test IDs, Radix state, and unrelated event behavior cannot leak into the limits row.

The UI is persistent: percentage and countdown text nodes are updated in place. If ChatGPT replaces the sidebar anchor, the same row is moved to the new location instead of being removed and recreated.

## Development

The project has no runtime or test dependencies. With Node.js installed:

```bash
npm run check
```

This performs a JavaScript syntax check and runs the Node test suite for metadata invariants, percentage formatting, countdown formatting, nested WHAM response parsing, and null-number handling.

## Compatibility notes

This project depends on undocumented ChatGPT frontend/API behavior and can break when ChatGPT changes its DOM or backend endpoints.

The integration currently relies on selectors/classes including:

```text
.ce-nav-trigger
.ce-nav-trigger-collapsed
[data-testid="accounts-profile-button"]
```

## Reference project

Sidebar integration was developed against **ChatGPT Exporter 2.35.0** by `pionxzh`:
https://github.com/pionxzh/chatgpt-exporter

## License

MIT.
