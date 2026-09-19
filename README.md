# ChatGPT Codex Limits Mini

A lightweight Tampermonkey userscript that shows remaining **Codex 5-hour** and **weekly** limits directly in the ChatGPT sidebar.

## Features

- Shows remaining Codex usage for the 5-hour and weekly windows
- Shows a live reset countdown under each limit (`↻ 2h 14m`, `↻ 3d 8h`)
- Refreshes automatically every 2 minutes
- Click the row to force-refresh usage
- Handles ChatGPT sidebar collapse/expand state
- Integrates visually with **ChatGPT Exporter** when it is installed
- Falls back to a standalone native-looking sidebar row when Exporter is absent
- Avoids triggering Exporter's Radix HoverCard when hovering the limits row

## Installation

### One-click install

**[Install with Tampermonkey](https://raw.githubusercontent.com/alirezaghm83/chatgpt-codex-limits-mini/main/chatgpt-codex-limits-mini.user.js)**

Open the link above with Tampermonkey installed. Tampermonkey should recognize the `.user.js` file and show its installation screen.

The script declares the GitHub Raw URL as both `@downloadURL` and `@updateURL`, so compatible userscript managers can detect future version bumps pushed to `main`.

### Manual install

1. Install Tampermonkey (or another compatible userscript manager).
2. Open `chatgpt-codex-limits-mini.user.js`.
3. Create a new userscript and paste the file contents.
4. Open or refresh ChatGPT.

## How it works

The script reads the current ChatGPT session, obtains the access token when available, and requests:

```text
/backend-api/wham/usage
```

It identifies the 5-hour and 7-day rate-limit windows by their `limit_window_seconds` values, converts `used_percent` to remaining percentage, and reads the reset timestamp to maintain a local countdown without extra API requests.

For sidebar placement, the script prefers ChatGPT Exporter's `.ce-nav-trigger` when present so the row inherits the same visual layout. Otherwise it inserts its own row immediately above ChatGPT's profile section.

## Compatibility notes

This project depends on undocumented ChatGPT frontend/API behavior and can break when ChatGPT changes its DOM or backend endpoints.

The Exporter integration currently relies on selectors/classes including:

```text
.ce-nav-trigger
.ce-nav-trigger-collapsed
.ce-menu-item-text
[data-testid="accounts-profile-button"]
```

## Reference project

Sidebar integration was developed against **ChatGPT Exporter 2.35.0** by `pionxzh`:
https://github.com/pionxzh/chatgpt-exporter

## License

MIT.
