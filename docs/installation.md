---
title: Installation
description: Install source-map-url and verify that it is ready to use.
navOrder: 2
---

# Installation

## Requirements

The npm package supports Node.js 18 or later.

## Install

```sh
npm install @coderevivehq/source-map-url
```

## Verify the installation

```sh
node -e 'console.log(require("@coderevivehq/source-map-url").getFrom("//# sourceMappingURL=app.js.map"))'
```

The command prints `app.js.map`.

## Browser loading

The distributed `source-map-url.js` file uses UMD. It can be loaded through AMD or directly in a browser, where it creates the `sourceMappingURL` global.

## Next steps

Continue to the [Usage guide](usage.md).
