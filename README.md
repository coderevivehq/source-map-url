<p align="center">
  <img src="https://raw.githubusercontent.com/coderevivehq/source-map-url/main/.github/assets/coderevive-hero.png" alt="source-map-url revived and maintained by CodeRevive" width="460">
</p>

<h1 align="center">source-map-url</h1>

<p align="center">
  A maintained continuation of <a href="https://github.com/lydell/source-map-url">source-map-url</a> by <a href="https://github.com/coderevivehq">CodeRevive</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@coderevivehq/source-map-url"><img alt="npm version" src="https://img.shields.io/npm/v/%40coderevivehq%2Fsource-map-url?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@coderevivehq/source-map-url"><img alt="npm downloads" src="https://img.shields.io/npm/dm/%40coderevivehq%2Fsource-map-url?style=flat-square"></a>
  <a href="https://github.com/coderevivehq/source-map-url/actions/workflows/ci.yml"><img alt="build status" src="https://github.com/coderevivehq/source-map-url/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/github/license/coderevivehq/source-map-url?style=flat-square"></a>
</p>

## Overview

source-map-url provides small CommonJS, AMD, and browser helpers for finding, reading, removing, and preserving JavaScript and CSS `sourceMappingURL` comments. It is intended for compatibility-sensitive tooling that needs the original package's four helper methods.

## Maintained by CodeRevive

This maintained continuation is published by [CodeRevive](https://github.com/coderevivehq). Security patches are our highest priority. We also review bug reports, feature requests, and suggestions from the community.

The project is based on the original [source-map-url](https://github.com/lydell/source-map-url) repository and its contributors.

## Quick links

- [Overview](#overview)
- [Maintained by CodeRevive](#maintained-by-coderevive)
- [Installation & setup](#installation--setup)
- [Documentation](#documentation)
- [Usage](#usage)
- [Migration](#migration)
- [Contributing](#contributing)
- [Security & support](#security--support)
- [Credits & license](#credits--license)

## Installation & setup

```sh
npm install @coderevivehq/source-map-url
```

The npm package supports Node.js 18 and later. The distributed UMD module can also be loaded with AMD or as the browser global `sourceMappingURL`.

## Documentation

Detailed documentation is maintained in the [`docs/`](docs/) directory. Start with the [documentation overview](docs/index.md), then use the [Usage guide](docs/usage.md), [API reference](docs/api.md), [Examples](docs/examples.md), [Migration guide](docs/migration.md), and [Troubleshooting guide](docs/troubleshooting.md).

## Usage

```js
var sourceMappingURL = require("@coderevivehq/source-map-url")

var code = "console.log('hello')\n//# sourceMappingURL=app.js.map"

sourceMappingURL.getFrom(code)
// "app.js.map"

code = sourceMappingURL.removeFrom(code)
```

The package also provides `existsIn` and `insertBefore`. See the [API reference](docs/api.md) for their contracts and edge cases.

## Migration

Replace the original package name in the dependency and import. The four helper methods keep their established signatures. See the [Migration guide](docs/migration.md) for the exact change and the corrected handling of comment-like text inside strings.

## Contributing

Bug reports, focused improvements, and documentation updates are welcome through [GitHub issues](https://github.com/coderevivehq/source-map-url/issues) and [pull requests](https://github.com/coderevivehq/source-map-url/pulls). Please run `npm test` before submitting a change.

## Security & support

Report security concerns privately through the repository's [Security](https://github.com/coderevivehq/source-map-url/security) page. For usage questions and ordinary bugs, open a [GitHub issue](https://github.com/coderevivehq/source-map-url/issues) with a minimal reproduction when possible.

## Credits & license

This project is a maintained continuation of [lydell/source-map-url](https://github.com/lydell/source-map-url), originally created by Simon Lydell. Original code and CodeRevive-authored changes are licensed under the MIT License. Original copyright notices are retained in [LICENSE](LICENSE).
