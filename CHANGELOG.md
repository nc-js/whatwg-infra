# Changelog

## 1.1.0 (Unreleased)
### Features
- A new module under `./constants`, which exports constants of XML namespaces
  ```diff
  + export const namespaceHtml = 'http://www.w3.org/1999/xhtml'
  + export const namespaceMathMl = 'http://www.w3.org/1998/Math/MathML'
  + export const namespaceSvg = 'http://www.w3.org/2000/svg'
  + export const namespaceXLink = 'http://www.w3.org/1999/xlink'
  + export const namespaceXml = 'http://www.w3.org/XML/1998/namespace'
  + export const namespaceXmlNs = 'http://www.w3.org/2000/xmlns/'
  ```

### Documentation
- Improve JSR.io's rendering of `@see` annotations which references external links

### Deprecated
- `isAsciiWhitespace()` is deprecated. Use `isAsciiWsp()` instead.

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
