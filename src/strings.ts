/**
 * Implementation of string algorithms
 * @module
 */

import {
	isAscii,
	isAsciiWhitespace,
	isCodePointBetween,
	isScalarValue,
	isSurrogate,
} from './codePoints.ts'

/**
 * Checks if all codepoints of a string matches a given predicate.
 */
export const stringMatches = (
	s: string,
	predicate: (cp: string) => boolean,
): boolean => {
	for (const codepoint of s) {
		if (!predicate(codepoint)) {
			return false
		}
	}
	return true
}

/**
 * Checks if a string is an ASCII string, where every codepoint
 * must be an ASCII codepoint.
 *
 * @see https://infra.spec.whatwg.org/#ascii-string
 */
export const isStringAscii = (s: string): boolean =>
	stringMatches(s, (codepoint) => isAscii(codepoint))

/**
 * Checks if a string is isomorphic, where every codepoint
 * must be between the range of U+0000 NULL to 0+00FF (ÿ), inclusive.
 *
 * @see https://infra.spec.whatwg.org/#isomorphic-string
 */
export const isStringIsomorphic = (s: string): boolean =>
	stringMatches(s, (codepoint) => isCodePointBetween(codepoint, 0x00, 0x00FF))

/**
 * Checks if a string is a scalar value string, where every codepoint
 * must be a scalar value (not a surrogate).
 *
 * @see https://infra.spec.whatwg.org/#scalar-value-string
 */
export const isStringScalarValue = (s: string): boolean =>
	stringMatches(s, (codepoint) => isScalarValue(codepoint))

/**
 * Collects a sequence of codepoints that passes a given predicate function,
 * starting at a given position.
 *
 * @see https://infra.spec.whatwg.org/#collect-a-sequence-of-code-points
 * @returns A 2-tuple of the new string and the new position
 */
export const collectCodepoints = (
	s: string,
	position: number,
	predicate: (codePoint: string) => boolean,
): [string, number] => {
	if (position >= s.length || s === '') {
		return ['', position]
	}

	let newPosition = position
	let result = ''

	for (const codePoint of s.slice(position)) {
		if (predicate(codePoint)) {
			result += codePoint
			newPosition++
		} else {
			break
		}
	}

	return [result, newPosition]
}

/**
 * A string with only Unicode scalar values (non-surrogate codepoints).
 *
 * @see https://unicode.org/glossary/#unicode_scalar_value
 * @see https://infra.spec.whatwg.org/#scalar-value-string
 * @see https://infra.spec.whatwg.org/#javascript-string-convert
 */
export const convertStringToScalarValue = (s: string): string => {
	let scalarValueString = ''
	for (const codePoint of s) {
		scalarValueString += isSurrogate(codePoint) ? '\u{FFFD}' : codePoint
	}

	return scalarValueString
}

/**
 * A string without any codepoints equal to either `U+000A`
 * or `U+000D`.
 *
 * @see https://infra.spec.whatwg.org/#strip-newlines
 */
export const stripNewlines = (s: string): string => {
	let stripped = ''
	for (const codePoint of s) {
		if (codePoint !== '\u{000A}' && codePoint !== '\u{000D}') {
			stripped += codePoint
		}
	}

	return stripped
}

/**
 * Replaces consecutive codepoints/pairs of `U+000D` and `U+000A`
 * with a single `U+000A`, and any remaining `U+000D` codepoints
 * with a single `U+000A`.
 *
 * @see https://infra.spec.whatwg.org/#normalize-newlines
 */
export const normalizeNewlines = (s: string): string => {
	let normalized = ''
	for (let i = 0; i < s.length; i++) {
		if (s[i] === '\u{000D}' && s[i + 1] === '\u{000A}') {
			normalized += '\u{000A}'
			i++
			continue
		}
		normalized += s[i]
	}

	return normalized.replace('\u{000D}', '\u{000A}')
}

/**
 * An implementation of the WHATWG "strip trailing and leading ascii whitespace" algorithm.
 * This is a slightly different, less strict version of `String.prototype.trim()`.
 *
 * Both remove: `U+0009` TAB, `U+000C` FF, and `U+0020` SPACE.
 *
 * Notable differences:
 *  - This also removes: `U+000A` LF and `U+000D` CR.
 *  - `trim()` also removes: `U+000B` VT, `U+00A0` NBSP, `U+FEFF` ZWNBSP,
 *    and characters that fall within the General Unicode `Space_Separator`
 *    category (USP).
 *
 * @see https://infra.spec.whatwg.org/#strip-leading-and-trailing-ascii-whitespace
 * @see https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.trim
 */
export const stripAsciiWsp = (s: string): string => {
	let leadingIndex = 0
	while (isAsciiWhitespace(s[leadingIndex] as string)) {
		leadingIndex++
	}

	let trailingIndex = s.length
	while (isAsciiWhitespace(s[trailingIndex - 1] as string)) {
		trailingIndex--
	}

	return s.substring(leadingIndex, trailingIndex)
}

/**
 * Algorithm to collapse/reduce consecutive ASCII whitespace codepoints
 * into a single U+0020 codepoint, as well as remove whitespace from
 * both the start and end.
 *
 * @see https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
 */
export const stripCollapseAsciiWsp = (s: string): string => {
	let result = ''
	let lastSeenWhitespace = false

	for (let i = 0; i < s.length; i++) {
		const codepoint = s[i] as string
		if (isAsciiWhitespace(codepoint)) {
			if (!lastSeenWhitespace) {
				lastSeenWhitespace = true
				result += '\u{0020}'
				continue
			}
		} else {
			lastSeenWhitespace = false
			result += codepoint
		}
	}

	return stripAsciiWsp(result)
}
