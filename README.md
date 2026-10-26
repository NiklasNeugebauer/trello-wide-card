# Trello Wide Card

Firefox / Zen WebExtension that opens Trello card dialogs at 90% of the viewport width.
The main column and the comments panel share the extra space in Trello's native 620:460 proportion.

Pure CSS, no permissions beyond running on `trello.com`. Hooks on Trello's stable
`role`/`data-testid` attributes rather than its hashed class names; verified against the
card back as of October 2026.

## Install

**Permanent (Zen, LibreWolf and other builds without forced signing):**

1. `about:config` → set `xpinstall.signatures.required` to `false`.
2. `./build.sh`, then open `about:addons` → gear icon → *Install Add-on From File…* → pick `trello-wide-card.xpi`.

**Temporary (any Firefox 121+, lost on restart):**

`about:debugging#/runtime/this-firefox` → *Load Temporary Add-on…* → pick `manifest.json`.

## Tweak

Both knobs are in `trello-wide.css`: the dialog width (`90vw`) and the column split
(the first number of the two `flex` shorthands, 620 for the main column and 460 for comments).
Trello's own drag handle between the columns still works on top of that.
