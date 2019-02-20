# enum-utils

Conversion and extraction utilities for enums with TypeScript type-safety.

[![tslint: Slick](https://img.shields.io/badge/tslint-slick-3a6b93.svg?style=flat-square)](https://github.com/typeslick/tslint-slick)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/enum-utils.svg?style=flat-square)](https://npmjs.org/package/enum-utils)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/typeslick/enum-utils/blob/master/LICENSE)

## Install

```sh
$ npm install enum-utils
```

## Usage

Node.js / CommonJS:

```typescript
const { EnumUtils } = require('enum-utils')
```

ESNext / TypeScript:

```typescript
import { EnumUtils } from 'enum-utils'
```

### API

<a id="EnumUtils.entries"></a>

### EnumUtils.entries<`T`>(e: _`T`_): [`string`, `T`][]

Returns an array of key/values of the enumerable properties of an enum.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| e    | `T`  | Enum value. |

**Returns:** [`string`, `T`][]

---

<a id="EnumUtils.keys"></a>

### EnumUtils.keys<`T`>(e: _`T`_): `string`[]

Returns the names of the enumerable properties and methods of an enum.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| e    | `T`  | Enum value. |

**Returns:** `string`[]

---

<a id="EnumUtils.keysByValue"></a>

### EnumUtils.keysByValue<`T`>(e: _`T`_): `object`

Returns a value to key mapping object for the input enum.

Note: Reverse mapping keys are omitted.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| e    | `T`  | Enum value. |

**Returns:** `object`

---

<a id="EnumUtils.values"></a>

### EnumUtils.values<`T`>(e: _`T`_): `T`[]

Returns an array of values of the enumerable properties of an enum.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| e    | `T`  | Enum value. |

**Returns:** `T`[]

---

<a id="EnumUtils.valuesByKey"></a>

### EnumUtils.valuesByKey<`T`>(input: _`T`_): `object`

Returns a key -> value mapping object for the input enum.

Note: Reverse mapping keys are omitted.

**Type parameters:**

#### T

**Parameters:**

| Name  | Type |
| ----- | ---- |
| input | `T`  |

**Returns:** `object`

---

## Related

- [http-method-enum](https://github.com/typeslick/http-method-enum)
- [status-code-enum](https://github.com/typeslick/status-code-enum)

## News and Updates

[Follow @typeslick on Twitter](https://twitter.com/typeslick) for the latest
updates and new project announcements.

## Sponsors

- [Loomble](https://loomble.com/)

## Maintainers

- [Jay Rylan](https://jayrylan.com/)

## License

[MIT](https://github.com/typeslick/enum-utils/blob/master/LICENSE)
