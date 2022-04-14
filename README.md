# Virginia Golf Club - Chrome Enhancement Suite

![Buuld](https://github.com/tim-bellette/virginia-gc/workflows/Build/badge.svg) [![Release](https://github.com/tim-bellette/virginia-gc/workflows/Release/badge.svg)](https://github.com/tim-bellette/virginia-gc/actions/workflows/release.yml) ![CodeQL](https://github.com/tim-bellette/virginia-gc/workflows/CodeQL/badge.svg) ![Version](https://img.shields.io/github/manifest-json/v/tim-bellette/virginia-gc?filename=public%2Fmanifest.json)

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
npm install
npm run build
```
2. Open chrome and navigate to `chrome://extensions/`.
3. Select `Load unpacked` and select the `dist` directory.
 
