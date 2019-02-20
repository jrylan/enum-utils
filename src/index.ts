import isPlainObject from 'is-plain-object'

/**
 * Type union for an enum value.
 *
 * @public
 */
export type MixedValue = string | number

/**
 * Type union of all the values an enum can be made from.
 *
 * @public
 */
export type EnumValue<T = MixedValue> =
  | { [key: string]: string | number } // TypeScript enum type
  | T[]
  | Map<string | number, T>
  | Set<T>

type GetValueType<T> = T extends string[]
  ? string
  : T extends number[]
  ? number
  : T extends Set<string>
  ? string
  : T extends Set<number>
  ? number
  : T extends Map<MixedValue, string>
  ? string
  : T extends Map<MixedValue, number>
  ? number
  : T extends { [key: string]: string }
  ? string
  : T extends { [key: string]: number }
  ? number
  : MixedValue

/**
 * Checks if a key is numeric and converts it to a number. Otherwise, the input
 * value is returned.
 *
 * @internal
 * @param value - Value to format.
 */
function formatKey(value: MixedValue): MixedValue {
  const numValue = +value
  return isNaN(numValue) ? value : numValue
}

/**
 * Check if a value is a string or number.
 *
 * @internal
 * @param value - Value to check.
 */
function isValidEnumValue(value: unknown): value is MixedValue {
  // tslint:disable-next-line strict-type-predicates
  return typeof value === 'number' || typeof value === 'string'
}

/**
 * Check if a value is a number.
 *
 * @internal
 * @param value - Value to check.
 */
function isNum(value: unknown): value is number {
  // tslint:disable-next-line strict-type-predicates
  return typeof value === 'number'
}

/**
 * Check if a value is a string.
 *
 * @internal
 * @param value - Value to check.
 */
function isString(value: unknown): value is string {
  // tslint:disable-next-line strict-type-predicates
  return typeof value === 'string'
}

/**
 * Make an object from a combination of an array of keys and an array of values.
 *
 * @internal
 * @param keys - Keys array.
 * @param values - Values array.
 */
function makeObject(keys: MixedValue[], values: MixedValue[]): object {
  const obj = {}
  let i = 0
  for (const key of keys) {
    obj[key] = values[i]
    i += 1
  }
  return obj
}

/**
 * Transform various input formats into a key/value pair object.
 *
 * @internal
 * @param input - Value to transform.
 */
function getKeyValueObject(input: unknown): {} {
  const obj = {}
  let keys: MixedValue[] = []
  let values: MixedValue[] = []
  let target = {}

  if (
    // tslint:disable-next-line strict-type-predicates
    typeof input === 'object' &&
    input !== null &&
    isPlainObject(input)
  ) {
    keys = Object.keys(input)
    values = Object.values(input)
    target = input
  } else if (Array.isArray(input)) {
    keys = Array.from(new Set(input))
    values = keys
    target = makeObject(keys, input)
  } else if (input instanceof Set && input.size > 0) {
    keys = Array.from(input)
    values = keys
    target = makeObject(keys, values)
  } else if (input instanceof Map && input.size > 0) {
    keys = Array.from(input.keys())
    values = Array.from(input.values())
    target = makeObject(keys, values)
  }

  if (
    keys.every(isValidEnumValue) === false ||
    values.every(isValidEnumValue) === false
  ) {
    return obj
  }

  keys = keys.map(formatKey)
  const stringKeys = keys.filter(isString)
  const numKeys = keys.filter(isNum)

  // Return early if it's not an enum with reverse mapping:
  if (
    stringKeys.length !== numKeys.length ||
    keys.length / 2 !== stringKeys.length
  ) {
    return target
  }

  // Handle reverse mapping by only returning string keys in the object:
  for (const key of stringKeys) {
    obj[key] = target[key]
  }

  return obj
}

/**
 * Enum util methods.
 *
 * @public
 */
export const EnumUtils = {
  /**
   * Returns an array of key/values of the enumerable properties of an enum.
   *
   * @public
   * @param e — Enum value.
   */
  entries<T = unknown>(e: T): [string, GetValueType<T>][] {
    return Object.entries(getKeyValueObject(e))
  },

  /**
   * Returns the names of the enumerable properties and methods of an enum.
   *
   * @public
   * @param e - Enum value.
   */
  keys<T = unknown>(e: T): string[] {
    return Array.isArray(e) ? e : Object.keys(getKeyValueObject(e))
  },

  /**
   * Returns a value to key mapping object for the input enum.
   *
   * Note: Reverse mapping keys are omitted.
   *
   * @public
   * @param e - Enum value.
   */
  keysByValue<T = unknown>(e: T): { [key: string]: string } {
    const obj = getKeyValueObject(e)
    const keysByValue = {}
    for (const [key, keyValue] of Object.entries(obj)) {
      keysByValue[keyValue as MixedValue] = key
    }
    return keysByValue
  },

  /**
   * Returns an array of values of the enumerable properties of an enum.
   *
   * @public
   * @param e - Enum value.
   */
  values<T = unknown>(e: T): GetValueType<T>[] {
    return Array.isArray(e) ? e : Object.values(getKeyValueObject(e))
  },

  /**
   * Returns a key -> value mapping object for the input enum.
   *
   * Note: Reverse mapping keys are omitted.
   *
   * @public
   * @param e - Enum value.
   */
  valuesByKey<T = unknown>(input: T): { [key: string]: GetValueType<T> } {
    return getKeyValueObject(input)
  }
}

/**
 * @public
 */
export default EnumUtils
