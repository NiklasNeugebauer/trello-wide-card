#!/usr/bin/env bash
# Packs the extension into an installable .xpi next to this script.
set -euo pipefail
cd "$(dirname "$0")"
rm -f trello-wide-card.xpi
zip -q -r trello-wide-card.xpi manifest.json trello-wide.css
echo "built $(pwd)/trello-wide-card.xpi"
