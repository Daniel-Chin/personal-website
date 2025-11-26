#!/usr/bin/env fish

env NODE_OPTIONS=--openssl-legacy-provider npm run build
dragon-drop build/
