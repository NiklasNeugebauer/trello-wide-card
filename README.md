# Trello Wide Card

Firefox / Zen WebExtension that opens Trello card dialogs at 90% of the viewport width.

## Install

**Permanent (Zen, LibreWolf and other builds without forced signing):**

1. `about:config` → set `xpinstall.signatures.required` to `false`.
2. `./build.sh`, then open `about:addons` → gear icon → *Install Add-on From File…* → pick `trello-wide-card.xpi`.

**Temporary (any Firefox, lost on restart):**

`about:debugging#/runtime/this-firefox` → *Load Temporary Add-on…* → pick `manifest.json`.

## Tweak

Width lives in two places: `--twc-width` in `trello-wide.css` and `WIDTH` in `trello-wide.js`.
