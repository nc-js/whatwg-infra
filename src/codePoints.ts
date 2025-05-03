/**
 * Implementation of Unicode codepoint algorithms
 * @module
 */

/**
 * Predicate function to validate if a Unicode code point
 * exists inclusively between a range of code points.
 */
export const isCodePointBetween = (
	value: string,
	low: number,
	max: number,
): boolean => {
	const codePoint = value.codePointAt(0)
	return (codePoint === undefined
		? false
		: codePoint >= low && codePoint <= max)
}

/**
 * A code point that exists between 0 (`0x0000` NUL)
 * and 127 (`0x007F` DEL).
 *
 * @see https://infra.spec.whatwg.org/#ascii-byte
 */
export const isAsciiByte = (v: string): boolean =>
	isCodePointBetween(v, 0x00, 0x7F)

/**
 * A code point inclusively between the range of:
 *  - `U+D800` HIGH SURROGATES
 *  - `U+DFFF` LOW SURROGATES
 *
 * @see https://infra.spec.whatwg.org/#surrogate
 */
export const isSurrogate = (v: string): boolean => {
	for (const codePoint of v) {
		if (!isCodePointBetween(codePoint, 0xd800, 0xDFFF)) {
			return false
		}
	}

	return true
}

/**
 * A code point that is not a Unicode surrogate.
 *
 * @see https://infra.spec.whatwg.org/#surrogate
 * @see https://infra.spec.whatwg.org/#scalar-value
 */
export const isScalarValue = (v: string): boolean => !isSurrogate(v)

/**
 * A code point that is either:
 *  - inclusively between the range of `U+FDD0` and `U+FDEF`, or:
 *  - One of `U+FFFE`, `U+FFFF`, `U+1FFFE`, `U+1FFFF`, `U+2FFFE`, `U+2FFFF`,
 *    `U+3FFFE`, `U+3FFFF`, `U+4FFFE`, `U+4FFFF`, `U+5FFFE`, `U+5FFFF`,
 *    `U+6FFFE`, `U+6FFFF`, `U+7FFFE`, `U+7FFFF`, `U+8FFFE`, `U+8FFFF`,
 *    `U+9FFFE`, `U+9FFFF`, `U+AFFFE`, `U+AFFFF`, `U+BFFFE`, `U+BFFFF`,
 *    `U+CFFFE`, `U+CFFFF`, `U+DFFFE`, `U+DFFFF`, `U+EFFFE`, `U+EFFFF`,
 *    `U+FFFFE`, `U+FFFFF`, `U+10FFFE`, or `U+10FFFF`.
 *
 * @see https://infra.spec.whatwg.org/#noncharacter
 */
export const isNonCharacter = (v: string): boolean => {
	return isCodePointBetween(v, 0xFDD0, 0xFDEF) ||
		[
			0xFFFE,
			0xFFFF,
			0x1FFFE,
			0x1FFFF,
			0x2FFFE,
			0x2FFFF,
			0x3FFFE,
			0x3FFFF,
			0x4FFFE,
			0x4FFFF,
			0x5FFFE,
			0x5FFFF,
			0x6FFFE,
			0x6FFFF,
			0x7FFFE,
			0x7FFFF,
			0x8FFFE,
			0x8FFFF,
			0x9FFFE,
			0x9FFFF,
			0xAFFFE,
			0xAFFFF,
			0xBFFFE,
			0xBFFFF,
			0xCFFFE,
			0xCFFFF,
			0xDFFFE,
			0xDFFFF,
			0xEFFFE,
			0xEFFFF,
			0xFFFFE,
			0xFFFFF,
			0x10FFFE,
		].includes(v.codePointAt(0) as number)
}

/**
 * A code point that is one of the following:
 *  - `U+0009` TAB - Character tabulation
 *  - `U+000A` EOL, LF, NL - End of line
 *  - `U+000D` CR - Carriage return
 *
 * @see https://infra.spec.whatwg.org/#ascii-tab-or-newline
 */
export const isAsciiTabOrNewline = (v: string): boolean =>
	v === '\u{0009}' || v === '\u{000A}' || v === '\u{000D}'

/**
 * A code point that's either an ASCII tab or newline,
 * `U+000C` FF Form Feed, or `U+0020` SP Space.
 *
 * @see https://infra.spec.whatwg.org/#ascii-tab-or-newline
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 */
export const isAsciiWhitespace = (v: string): boolean =>
	isAsciiTabOrNewline(v) || v === '\u{000C}' || v === '\u{0020}'

/**
 * A code point inclusively between the range of:
 *  - `U+0000` NULL
 *  - `U+001F` INFORMATION SEPARATOR ONE
 *
 * @see https://infra.spec.whatwg.org/#c0-control
 */
export const isC0Control = (v: string): boolean =>
	isCodePointBetween(v, 0x0000, 0x001F)

/**
 * A code point that's either a C0 control or U+0020 SPACE.
 *
 * @see https://infra.spec.whatwg.org/#c0-control
 * @see https://infra.spec.whatwg.org/#c0-control-or-space
 */
export const isC0ControlOrSpace = (v: string): boolean =>
	isC0Control(v) || v === '\u{0020}'

/**
 * A code point that's either a C0 control, or inclusively
 * between the range of:
 * - `U+007F` DELETE
 * - `U+009F` APPLICATION PROGRAMMING COMMAND
 *
 * @see https://infra.spec.whatwg.org/#c0-control
 * @see https://infra.spec.whatwg.org/#control
 */
export const isControl = (v: string): boolean =>
	isC0Control(v) || isCodePointBetween(v, 0x007F, 0x009F)

/**
 * A code point that is inclusively between the range of
 * `U+0030` (0) and `U+0039` (9).
 *
 * @see https://infra.spec.whatwg.org/#ascii-digit
 */
export const isAsciiDigit = (v: string): boolean =>
	isCodePointBetween(v, 0x0030, 0x0039)

/**
 * A code point that is inclusively between the range of
 * `U+0041` (A) and `U+0046` (F).
 *
 * @see https://infra.spec.whatwg.org/#ascii-upper-hex-digit
 */
export const isAsciiUpperHexDigit = (v: string): boolean =>
	isCodePointBetween(v, 0x0041, 0x0046)

/**
 * A code point that is inclusively between the range of
 * `U+0061` (a) and `U+0066` (f).
 * @see https://infra.spec.whatwg.org/#ascii-lower-hex-digit
 */
export const isAsciiLowerHexDigit = (v: string): boolean =>
	isCodePointBetween(v, 0x0061, 0x0066)

/**
 * A code point that is either an ASCII lower or upper hex digit.
 *
 * @see https://infra.spec.whatwg.org/#ascii-upper-hex-digit
 * @see https://infra.spec.whatwg.org/#ascii-lower-hex-digit
 * @see https://infra.spec.whatwg.org/#ascii-hex-digit
 */
export const isAsciiHexDigit = (v: string): boolean =>
	isAsciiLowerHexDigit(v) || isAsciiUpperHexDigit(v)

/**
 * A code point that is inclusively between the range of
 * `U+0041` (A) and `U+005A` (Z).
 *
 * @see https://infra.spec.whatwg.org/#ascii-upper-alpha
 */
export const isAsciiUpperAlpha = (v: string): boolean =>
	isCodePointBetween(v, 0x0041, 0x005A)

/**
 * A code point that is inclusively between the range of
 * `U+0061` (a) and `U+007A` (z).
 *
 * @see https://infra.spec.whatwg.org/#ascii-lower-alpha
 */
export const isAsciiLowerAlpha = (v: string): boolean =>
	isCodePointBetween(v, 0x0061, 0x007A)

/**
 * A code point that is either an ASCII lower alpha or
 * ASCII upper alpha.
 *
 * @see https://infra.spec.whatwg.org/#ascii-lower-alpha
 * @see https://infra.spec.whatwg.org/#ascii-upper-alpha
 * @see https://infra.spec.whatwg.org/#ascii-alpha
 */
export const isAsciiAlpha = (v: string): boolean =>
	isAsciiLowerAlpha(v) || isAsciiUpperAlpha(v)

/**
 * A code point that is an ASCII digit or ASCII alpha.
 *
 * @see https://infra.spec.whatwg.org/#ascii-numeric
 * @see https://infra.spec.whatwg.org/#ascii-alpha
 */
export const isAsciiAlphanumeric = (v: string): boolean =>
	isAsciiDigit(v) || isAsciiAlpha(v)
