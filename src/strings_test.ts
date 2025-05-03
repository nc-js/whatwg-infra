import { assert, assertEquals, assertFalse } from '@std/assert'
import {
	collectCodepoints,
	convertStringToScalarValue,
	isStringAscii,
	isStringIsomorphic,
	isStringScalarValue,
	normalizeNewlines,
	stringMatches,
	stripAsciiWsp,
	stripCollapseAsciiWsp,
	stripNewlines,
} from './strings.ts'
import { isAsciiAlpha } from './codePoints.ts'

Deno.test('string matches a predicate', () => {
	assert(stringMatches('bbbb', (codepoint) => codepoint === 'b'))
})

Deno.test('string fails to match a predicate', () => {
	assertFalse(stringMatches('bbba', (codepoint) => codepoint === 'b'))
})

Deno.test('string is ASCII', () => {
	assert(isStringAscii(''))
	assert(isStringAscii('foo'))
	assert(isStringAscii('bar'))
	assert(isStringAscii('\u{0000}\u{007F}'))
})

Deno.test('string is isomorphic', () => {
	assert(isStringIsomorphic(''))
	assert(isStringIsomorphic('\u{0000}\u{00FF}'))
	assertFalse(isStringIsomorphic('\u{0000}\u{0100}'))
})

Deno.test('string is scalar value', () => {
	assert(isStringScalarValue(''))
	assert(isStringScalarValue('\u{0000}\u{007F}'))
	assert(isStringScalarValue('\u{0000}\u{00FF}'))
	assert(isStringScalarValue('\u{0000}\u{D7FF}'))
	assert(isStringScalarValue('\u{0000}\u{E000}'))

	assertFalse(isStringScalarValue('\u{D800}'))
	assertFalse(isStringScalarValue('\u{DBFF}'))
	assertFalse(isStringScalarValue('\u{DC00}'))
	assertFalse(isStringScalarValue('\u{DFFF}'))
})

Deno.test('collect a sequence of codepoints', () => {
	const values: [
		string,
		number,
		(s: string) => boolean,
		[string, number],
	][] = [
		[
			'test1234',
			0,
			(s) => isAsciiAlpha(s),
			['test', 4],
		],
		[ // collect nothing if position > length of string
			'test',
			5,
			(s) => isAsciiAlpha(s),
			['', 5],
		],
		[ // collect nothing if string is empty
			'',
			0,
			() => true,
			['', 0],
		],
	]

	for (const testValue of values) {
		const [value, position, predicate, expected] = testValue
		assertEquals(collectCodepoints(value, position, predicate), expected)
	}
})

Deno.test('convert string to scalar value string', () => {
	const values: [string, string][] = [
		['', ''],
		['\u{D800}', '\u{FFFD}'],
		['\u{DFFF}', '\u{FFFD}'],
		['test', 'test'],
	]

	for (const value of values) {
		const [input, expected] = value
		assertEquals(convertStringToScalarValue(input), expected)
	}
})

Deno.test('strip newlines', () => {
	const values = [
		['', ''],
		['a\n\n', 'a'],
		['a\r\n\r\n', 'a'],
		['a\r\r', 'a'],
		['apple\nbanana', 'applebanana'],
	]
	for (const value of values) {
		const [input, expected] = value
		assertEquals(stripNewlines(input), expected)
	}
})

Deno.test('normalize newlines', () => {
	const values: [string, string][] = [
		['', ''],
		['\r', '\n'],
		['\r\n\r\n', '\n\n'],
		['a\r\ntttt\r', 'a\ntttt\n'],
	]
	for (const value of values) {
		const [input, expected] = value
		assertEquals(normalizeNewlines(input), expected)
	}
})

Deno.test('strip trailing and leading ASCII whitespace', () => {
	assertEquals(stripAsciiWsp(''), '')
})

Deno.test('strip and collapse ASCII whitespace', () => {
	const values: [string, string][] = [
		['', ''],
		['    ', ' '],
		['cat dog  hamster \n\r', 'cat dog hamster'],
		['\r  \n  cat dog  hamster', 'cat dog hamster'],
		['\r  \n  cat dog  hamster \n\r', 'cat dog hamster'],
	]
	for (const testValue of values) {
		const [value, expected] = testValue
		assertEquals(stripCollapseAsciiWsp(value), expected)
	}
})
