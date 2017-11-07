# query-string-encode
Tiny query string serializer. Handles nested objects and arrays. Useful in combination with [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch) and [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

Similar to jQuery's `$.param` and [`qs.stringify()`](https://github.com/ljharb/qs#stringifying)

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
Unlike serialized JSON, query strings is a lossy format. It's impossible to distinguishing between the string `"true"` and boolean `true`, or arrays or objects with numeric keys. Using JSON is safer. This is an inherent problem with the format and applies to any query string serializer.
