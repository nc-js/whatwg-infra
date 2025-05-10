/**
 * Integer types
 * @module
 */

const checkInt = (n: number, min: number, max: number) =>
	Number.isInteger(n) && n >= min && n <= max

const bigCheck = (n: number | bigint, min: bigint, max: bigint) => {
	if (typeof n === 'number') {
		if (Number.isInteger(n)) {
			n = BigInt(n)
		} else {
			return false
		}
	}
	return n >= min && n <= max
}

/**
 * Checks if the number is an 8-bit unsigned integer.
 * @see {@link https://infra.spec.whatwg.org/#8-bit-unsigned-integer}
 *
 * @example
 * ```ts
 * import { isUint8 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isUint8(0))
 * assert(isUint8(255)) // (2^8)-1
 * assertFalse(isUint8(-1))
 * assertFalse(isUint8(256)) // 2^8
 * assertFalse(isUint8(0.5))
 * ```
 */
export const isUint8 = (n: number): boolean => checkInt(n, 0, 255)

/**
 * Checks if the number is a 16-bit unsigned integer.
 * @see {@link https://infra.spec.whatwg.org/#16-bit-unsigned-integer}
 *
 * @example
 * ```ts
 * import { isUint16 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isUint16(0))
 * assert(isUint16(65535)) // (2^16)-1
 * assertFalse(isUint16(-1))
 * assertFalse(isUint16(65536)) // 2^16
 * assertFalse(isUint8(0.5))
 * ```
 */
export const isUint16 = (n: number): boolean => checkInt(n, 0, 65535)

/**
 * Checks if the number is a 32-bit unsigned integer.
 * @see {@link https://infra.spec.whatwg.org/#32-bit-unsigned-integer}
 *
 * @example
 * ```ts
 * import { isUint32 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isUint8(0))
 * assert(isUint32((2 ** 32) - 1))
 * assertFalse(isUint32(-1))
 * assertFalse(isUint32(2 ** 32))
 * assertFalse(isUint32(0.5))
 * ```
 */
export const isUint32 = (n: number): boolean => checkInt(n, 0, 4_294_967_295)

/**
 * Checks if the number is a 64-bit unsigned integer.
 *
 * If the given argument is of type `number`, it will be internally
 * changed to be a `bigint`.
 * @see {@link https://infra.spec.whatwg.org/#64-bit-unsigned-integer}
 *
 * @example
 * ```ts
 * import { isUint64 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isUint64(0n))
 * assert(isUint64((2n ** 64n) - 1n))
 * assertFalse(isUint64(-1))
 * assertFalse(isUint64(2n ** 64n))
 * assertFalse(isUint64(0.5))
 * ```
 */
export const isUint64 = (n: number | bigint): boolean =>
	bigCheck(n, 0n, 18_446_744_073_709_551_615n)

/**
 * Checks if the number is a 128-bit unsigned integer.
 *
 * If the given argument is of type `number`, it will be internally
 * changed to be a `bigint`.
 * @see {@link https://infra.spec.whatwg.org/#64-bit-unsigned-integer}
 *
 * @example
 * ```ts
 * import { isUint128 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isUint128(0n))
 * assert(isUint128((2n ** 128n) - 1n))
 * assertFalse(isUint128(-1))
 * assertFalse(isUint128(2n ** 128n))
 * ```
 */
export const isUint128 = (n: number | bigint): boolean =>
	bigCheck(n, 0n, 340_282_366_920_938_463_463_374_607_431_768_211_455n)

/**
 * Checks if the number is an 8-bit signed integer.
 * @see {@link https://infra.spec.whatwg.org/#8-bit-signed-integer}
 *
 * @example
 * ```ts
 * import { isInt8 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isInt8(-128))
 * assert(isInt8(127))
 * assertFalse(isInt8(-129))
 * assertFalse(isInt8(128))
 * assertFalse(isInt8(0.5))
 * ```
 */
export const isInt8 = (n: number): boolean => checkInt(n, -128, 127)

/**
 * Checks if the number is a 16-bit signed integer.
 * @see {@link https://infra.spec.whatwg.org/#16-bit-signed-integer}
 *
 * @example
 * ```ts
 * import { isInt16 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isInt16(-32768))
 * assert(isInt16(32767))
 * assertFalse(isInt16(-32769))
 * assertFalse(isInt16(32768))
 * assertFalse(isInt16(0.5))
 * ```
 */
export const isInt16 = (n: number): boolean => checkInt(n, -32768, 32767)

/**
 * Checks if the number is a 32-bit signed integer.
 * @see {@link https://infra.spec.whatwg.org/#32-bit-signed-integer}
 *
 * @example
 * ```ts
 * import { isInt32 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isInt32(-2147483648))
 * assert(isInt32(2147483647))
 * assertFalse(isInt32(-2147483649))
 * assertFalse(isInt32(2147483648))
 * assertFalse(isInt32(0.5))
 * ```
 */
export const isInt32 = (n: number): boolean =>
	checkInt(n, -2_147_483_648, 2_147_483_647)

/**
 * Checks if the number is a 64-bit signed integer.
 *
 * If the given argument is of type `number`, it will be internally
 * changed to be a `bigint`.
 * @see {@link https://infra.spec.whatwg.org/#64-bit-signed-integer}
 *
 * @example
 * ```ts
 * import { isInt64 } from '@nc/whatwg-infra/num'
 * import { assert, assertFalse } from '@std/assert'
 *
 * assert(isInt64(-1n * 9223372036854775808n))
 * assert(isInt64(9223372036854775807n))
 * assertFalse(isInt64(-1n * 9223372036854775809n))
 * assertFalse(isInt64(9223372036854775808n))
 * assertFalse(isInt64(0.5))
 * ```
 */
export const isInt64 = (n: number | bigint): boolean =>
	bigCheck(n, -1n * 9_223_372_036_854_775_808n, 9_223_372_036_854_775_807n)

export const isInt128 = (n: number | bigint): boolean =>
	bigCheck(
		n,
		-1n * 170_141_183_460_469_231_731_687_303_715_884_105_728n,
		170_141_183_460_469_231_731_687_303_715_884_105_727n,
	)
