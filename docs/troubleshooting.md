---
title: Troubleshooting
description: Resolve known source-map-url integration issues.
navOrder: 7
---

# Troubleshooting

## `getFrom` returns `null`

**Cause:** The source has no supported `sourceMappingURL` comment, or the annotation spacing differs from the established syntax.

**Resolution:** Use `//# sourceMappingURL=file.map` or `/*# sourceMappingURL=file.map */`. Do not insert a space between the comment opener and `#`.

## A URL is not fetched or resolved

**Cause:** source-map-url extracts and edits comment text; it does not load or resolve the referenced map.

**Resolution:** Pass the returned URL to the resolver or loader used by the consuming application.

## Getting help

For usage questions and reproducible bugs, open a [GitHub issue](https://github.com/coderevivehq/source-map-url/issues). Report security concerns privately through the repository's [Security](https://github.com/coderevivehq/source-map-url/security) page.
