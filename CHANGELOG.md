# Changelog

## 1.0.1 (2025-05-02)
- Fix minor rendering issue in README.md for jsr.io

## 1.0.0 (2025-05-02)
Initial release of package on JSR. Note that this was initially released on npmjs.com as `@neoncitylights/whatwg-infra`, and was moved to jsr.io as `@nc/whatwg-infra`.

The following changes below have been made to this package that were not originally in `@neoncitylights/whatwg-infra`:

### Breaking changes
- `isAsciiByte()` was renamed to `isAscii()`

### Features
- new `stringMatches()` function
- new `isStringIsomorphic()` function
- new `isStringAscii()` function
- new `isStringScalarValue()` function
