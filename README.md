[![NPM](https://img.shields.io/npm/v/query-string-encode.svg)](https://www.npmjs.com/package/query-string-encode)
[![Greenkeeper badge](https://badges.greenkeeper.io/friday/query-string-encode.svg)](https://greenkeeper.io/)
[![travis](https://img.shields.io/travis/friday/query-string-encode.svg)](https://travis-ci.org/friday/wholescreen/branches)
[![size](https://img.shields.io/github/size/friday/query-string-encode/index.ts.svg)](https://github.com/friday/query-string-encode/blob/master/index.ts)
[![license](https://img.shields.io/github/license/friday/query-string-encode.svg)](https://github.com/friday/query-string-encode/blob/master/LICENCE)

# query-string-encode
Tiny query string serializer (~20 lines of code). Handles nested objects and arrays. Useful in combination with [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch) and [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (for example).

Similar to jQuery's [`$.param`](http://api.jquery.com/jquery.param/) and [`qs.stringify()`](https://github.com/ljharb/qs#stringifying)

## Installation

`npm i query-string-encode`
or
`yarn add query-string-encode`

## Usage
```js
const queryStringEncode = require('query-string-encode');
queryStringEncode({hello: 'world'})
```

```js
// Using with Fetch API
fetch('/comment', {
  method: 'post',
  headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
  body: queryStringEncode({userId: 1, comment: 'Hello'})
});
```

## Beware
Unlike serialized JSON, query strings are lossy. The only supported data type is string, so it's not possible to distinguishing between `"true"` vs `true` or `5` vs `"5"` or `["a"]` vs `{0:'a'}`. Using JSON is safer. This is an inherent problem with the format and applies to any query string serializer.
