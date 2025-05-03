import { assert, assertEquals } from '@std/assert'
import {
	isAsciiAlpha,
	isAsciiAlphanumeric,
	isAsciiByte,
	isAsciiDigit,
	isAsciiHexDigit,
	isAsciiLowerAlpha,
	isAsciiLowerHexDigit,
	isAsciiTabOrNewline,
	isAsciiUpperAlpha,
	isAsciiUpperHexDigit,
	isAsciiWhitespace,
	isC0Control,
	isC0ControlOrSpace,
	isCodePointBetween,
	isNonCharacter,
	isSurrogate,
} from './codePoints.ts'

Deno.test('is codepoint %s in between %i and %i', () => {
	const values: [string, number, number, boolean][] = [
		['', 0x00, 0x20, false],
		['\u{00}', 0x00, 0x20, true],
		['\u{20}', 0x00, 0x20, true],
		['\u{7F}', 0x00, 0x20, false],
	]

	for (const value of values) {
		const [codePoint, min, max, expected] = value
		assertEquals(isCodePointBetween(codePoint, min, max), expected)
	}
})

Deno.test('is ASCII byte', () => {
	const values: [string, boolean][] = [
		['\u{0000}', true],
		['\u{003F}', true],
		['\u{007F}', true],
		['\u{0080}', false],
	]

	for (const value of values) {
		const [codePoint, expected] = value
		assertEquals(isAsciiByte(codePoint), expected)
	}
})

Deno.test('is Unicode surrogate', () => {
	const values: [string, boolean][] = [
		['\u{D800}', true],
		['\u{DFFF}', true],
		['\u{E000}', false],
	]
	for (const value of values) {
		const [codePoint, expected] = value
		assertEquals(isSurrogate(codePoint), expected)
	}
})

Deno.test('is non-character', () => {
	for (let i = 0xFDD0; i <= 0xFDEF; i++) {
		assert(isNonCharacter(String.fromCodePoint(i)))
	}

	for (let i = 0x4FFFE; i <= 0x10FFFF; i += 0x10000) {
		assert(isNonCharacter(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII tab or newline', () => {
	const values: [string, boolean][] = [
		['\u{0009}', true],
		['\u{000A}', true],
		['\u{000D}', true],
		['\u{0000}', false],
	]
	for (const value of values) {
		const [codePoint, expected] = value
		assertEquals(isAsciiTabOrNewline(codePoint), expected)
	}
})

Deno.test('is ASCII whitespace', () => {
	const values: [string, boolean][] = [
		['\u{0000}', false],
		['\u{0009}', true],
		['\u{000A}', true],
		['\u{000B}', false],
		['\u{000C}', true],
		['\u{000D}', true],
		['\u{0020}', true],
	]
	for (const value of values) {
		const [codePoint, expected] = value
		assertEquals(isAsciiWhitespace(codePoint), expected)
	}
})

Deno.test('is C0 control', () => {
	for (let i = 0x0000; i <= 0x001F; i++) {
		assert(isC0Control(String.fromCodePoint(i)))
	}
})

Deno.test('is C0 control or space', () => {
	for (let i = 0x0000; i <= 0x001F; i++) {
		assert(isC0ControlOrSpace(String.fromCodePoint(i)))
	}
	assert(isC0ControlOrSpace('\u{0020}'))
})

Deno.test('is ASCII digit', () => {
	for (let i = 0x0030; i <= 0x0039; i++) {
		assert(isAsciiDigit(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII upper hex digit', () => {
	for (let i = 0x0041; i <= 0x0046; i++) {
		assert(isAsciiUpperHexDigit(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII lower hex digit', () => {
	for (let i = 0x0061; i <= 0x0066; i++) {
		assert(isAsciiLowerHexDigit(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII hex digit', () => {
	for (let i = 0x0041; i <= 0x0046; i++) {
		assert(isAsciiHexDigit(String.fromCodePoint(i)))
	}

	for (let i = 0x0061; i <= 0x0066; i++) {
		assert(isAsciiHexDigit(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII upper alpha', () => {
	for (let i = 0x0041; i <= 0x005A; i++) {
		assert(isAsciiUpperAlpha(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII lower alpha', () => {
	for (let i = 0x0061; i <= 0x007A; i++) {
		assert(isAsciiLowerAlpha(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII alpha', () => {
	for (let i = 0x0041; i <= 0x005A; i++) {
		assert(isAsciiAlpha(String.fromCodePoint(i)))
	}

	for (let i = 0x0061; i <= 0x007A; i++) {
		assert(isAsciiAlpha(String.fromCodePoint(i)))
	}
})

Deno.test('is ASCII alphanumeric', () => {
	for (let i = 0x0030; i <= 0x0039; i++) {
		assert(isAsciiAlphanumeric(String.fromCodePoint(i)))
	}

	for (let i = 0x0041; i <= 0x005A; i++) {
		assert(isAsciiAlphanumeric(String.fromCodePoint(i)))
	}

	for (let i = 0x0061; i <= 0x007A; i++) {
		assert(isAsciiAlphanumeric(String.fromCodePoint(i)))
	}
})
