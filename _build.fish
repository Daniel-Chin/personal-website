#!/usr/bin/env fish

env NODE_OPTIONS=--openssl-legacy-provider npm run build
echo dragon-drop...
dragon-drop build/
