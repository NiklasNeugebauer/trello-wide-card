#!/usr/bin/env bash
# Signs the extension as unlisted on addons.mozilla.org and prints the .xpi path.
# AMO API credentials live in the keyring:
#   secret-tool store --label="AMO JWT issuer" service amo key issuer
#   secret-tool store --label="AMO JWT secret" service amo key secret
set -euo pipefail
cd "$(dirname "$0")"

WEB_EXT_API_KEY=$(secret-tool lookup service amo key issuer)
WEB_EXT_API_SECRET=$(secret-tool lookup service amo key secret)
export WEB_EXT_API_KEY WEB_EXT_API_SECRET

mise exec -- web-ext lint --source-dir . --ignore-files build.sh sign.sh mise.toml README.md LICENSE "*.xpi"
mise exec -- web-ext sign --source-dir . --ignore-files build.sh sign.sh mise.toml README.md LICENSE "*.xpi" --channel unlisted --artifacts-dir web-ext-artifacts
ls -t web-ext-artifacts/*.xpi | head -1
