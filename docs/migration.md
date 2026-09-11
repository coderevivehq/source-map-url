---
title: Migration
description: Migrate from source-map-url to the CodeRevive package.
navOrder: 6
---

# Migration

## Before you begin

Run the consuming project's tests after changing the package name. Version 0.4.2 retains the four established helper signatures but corrects the handling of comment-like text inside quoted strings and template literals.

## Changes from `source-map-url@0.4.1` to `@coderevivehq/source-map-url@0.4.2`

1. Replace the dependency name with `@coderevivehq/source-map-url`.
2. Replace the CommonJS import string; calls to `getFrom`, `existsIn`, `removeFrom`, and `insertBefore` can remain unchanged.
3. If application code uses the exposed `regex` directly, review the [API note](api.md#regex). The helper methods perform the quoted-text filtering.

## Before and after

```js
var sourceMappingURL = require("source-map-url")
```

```js
var sourceMappingURL = require("@coderevivehq/source-map-url")
```
