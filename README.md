# Trello Wide Card

Firefox / Zen WebExtension that opens Trello card dialogs at 90% of the viewport width.
The main column and the comments panel share the extra space in Trello's native 620:460 proportion.

Pure CSS, no permissions beyond running on `trello.com`. Hooks on Trello's stable
`role`/`data-testid` attributes rather than its hashed class names; verified against the
card back as of October 2026.

## Install

**Permanent:** open the `.xpi` from the
[latest release](https://github.com/NiklasNeugebauer/trello-wide-card/releases/latest) in
Firefox 142+ or Zen. It is signed as an unlisted add-on and updates itself from later releases.

**Temporary (lost on restart):**

`about:debugging#/runtime/this-firefox` → *Load Temporary Add-on…* → pick `src/manifest.json`.

## Release

Publish a GitHub release tagged `vX.Y.Z`. The workflow sets that version, signs it on
addons.mozilla.org (repo secrets `AMO_JWT_ISSUER` / `AMO_JWT_SECRET`) and attaches the `.xpi`
and `updates.json` to the release. Every version can only be signed once.

## Tweak

Both knobs are in `src/trello-wide.css`: the dialog width (`90vw`) and the column split
(the first number of the two `flex` shorthands, 620 for the main column and 460 for comments).
Trello's own drag handle between the columns still works on top of that.
