---
title: Usage
description: Read and remove a sourceMappingURL comment with source-map-url.
navOrder: 3
---

# Usage

## Basic example

```js
var sourceMappingURL = require("@coderevivehq/source-map-url")

var code = [
  "console.log('hello')",
  "//# sourceMappingURL=app.js.map"
].join("\n")

console.log(sourceMappingURL.existsIn(code))
console.log(sourceMappingURL.getFrom(code))

var codeWithoutMapComment = sourceMappingURL.removeFrom(code)
console.log(codeWithoutMapComment)
```

## What the example does

`existsIn` reports that the generated code has a source-map comment. `getFrom` returns `app.js.map`, and `removeFrom` returns the source text without that comment.

Only actual line or block comments are considered by the helper methods. Text such as `"//# sourceMappingURL=example.map"` inside a single-quoted string, double-quoted string, or template literal is ignored.

## Next steps

- See the [API reference](api.md) for all supported public methods.
- See [Examples](examples.md) for JavaScript and CSS cases.
