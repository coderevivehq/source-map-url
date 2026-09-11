---
title: API reference
description: Reference for the supported source-map-url API.
navOrder: 4
---

# API reference

All methods accept and return JavaScript strings. The package reports the first matching source-map comment.

## `getFrom(code)`

```js
sourceMappingURL.getFrom(code)
```

Returns the URL from the first `sourceMappingURL` comment as a string. Returns `null` when there is no matching comment. An annotation with no URL returns an empty string.

## `existsIn(code)`

```js
sourceMappingURL.existsIn(code)
```

Returns `true` when `code` contains a matching `sourceMappingURL` comment and `false` otherwise.

## `removeFrom(code)`

```js
sourceMappingURL.removeFrom(code)
```

Removes the first matching comment and the trailing whitespace consumed by the established matcher. Returns `code` unchanged when there is no match.

## `insertBefore(code, string)`

```js
sourceMappingURL.insertBefore(code, string)
```

Inserts `string` immediately before the first matching source-map comment. If no comment exists, it appends `string` to `code`.

## `regex`

```js
sourceMappingURL.regex
```

Exposes the original `RegExp` syntax matcher for compatibility. It matches `//#`, `//@`, `/*# */`, and `/*@ */` annotations using the package's established spacing rules. A regular expression alone cannot determine whether matched text is inside a JavaScript string; use `getFrom`, `existsIn`, `removeFrom`, or `insertBefore` when that distinction matters.

## Errors and edge cases

The helpers expect string inputs. They do not fetch, decode, resolve, or validate the returned URL. Quoted text and template-literal text are skipped; source-map annotations in actual JavaScript or CSS comments are matched.
