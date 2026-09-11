---
title: Examples
description: Use source-map-url with JavaScript and CSS source-map comments.
navOrder: 5
---

# Examples

## Preserve a source-map comment while appending text

`insertBefore` keeps a source-map annotation after content that must be added to a generated file.

```js
var sourceMappingURL = require("@coderevivehq/source-map-url")

var code = "console.log('hello')\n//# sourceMappingURL=app.js.map"
var updated = sourceMappingURL.insertBefore(code, "// License: MIT\n")

console.log(updated)
```

The inserted license line appears immediately before the source-map comment.

## Read a CSS block comment

The matcher supports block-comment syntax used by CSS.

```js
var sourceMappingURL = require("@coderevivehq/source-map-url")

var css = ".button { color: blue; }\n/*# sourceMappingURL=styles.css.map */"

console.log(sourceMappingURL.getFrom(css))
// "styles.css.map"
```
