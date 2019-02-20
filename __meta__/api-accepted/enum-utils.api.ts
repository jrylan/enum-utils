// @public
declare const EnumUtils: {
    entries<T = unknown>(e: T): [string, GetValueType<T>][];
    keys<T = unknown>(e: T): string[];
    keysByValue<T = unknown>(e: T): {
        // (undocumented)
        [key: string]: string;
    };
    values<T = unknown>(e: T): GetValueType<T>[];
    valuesByKey<T = unknown>(input: T): {
        // (undocumented)
        [key: string]: GetValueType<T>;
    };
};

// @public
declare type EnumValue<T = MixedValue> = {
    // (undocumented)
    [key: string]: string | number;
} | T[] | Map<string | number, T> | Set<T>;

// @public
declare type MixedValue = string | number;


// (No @packageDocumentation comment for this package)
