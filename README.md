# Virginia Golf Club - Chrome Enhancement Suite

[![Build and Release](https://github.com/tim-bellette/virginia-gc/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/tim-bellette/virginia-gc/actions/workflows/release.yml) ![Version](https://img.shields.io/github/manifest-json/v/tim-bellette/virginia-gc?filename=public%2Fmanifest.json)

Chrome Extension to add additional functionaility, and styling, to https://virginiagolf.com.au/.

Currently not available on the Chrome Web Store, but can be loaded as an unpacked extension.

## Installation

### Option 1 - From Release

1. Download latest release from https://github.com/tim-bellette/virginia-gc/releases.
2. Extract files to a directory e.g. `%USERPROFILE%\virginia-gc`.
3. Open chrome and navigate to `chrome://extensions/`.
4. Select `Load unpacked` and select the directory containing the extension.

### Option 2 - From Source

1. Download source code and build:
```shell
npm run build
```
2. Open chrome and navigate to `chrome://extensions/`.
3. Select `Load upnacked` and select the `dist` directory.
