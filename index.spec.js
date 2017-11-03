const qse = require('./dist/query-string-encode.cjs.js');

test('Invalid objects should result in empty strings', () => {
	expect(qse()).toBe('');
	expect(qse(undefined)).toBe('');
	expect(qse(null)).toBe('');
	expect(qse('Hello')).toBe('');
	expect(qse(5)).toBe('');
	expect(qse(true)).toBe('');
	expect(qse(false)).toBe('');
});

test('Empty objects should result in empty strings', () => {
	expect(qse({})).toBe('');
	expect(qse([])).toBe('');
});

test('Array and object serialization', () => {
	expect(qse([1,2,3])).toBe('0=1&1=2&2=3'); // Array
	expect(qse({a:1, b:2})).toBe('a=1&b=2'); // Object
	expect(qse({a: {b: {c: 1}}})).toBe('a%5Bb%5D%5Bc%5D=1') // Deep object
	expect(qse([1,[2,[3]]])).toBe('0=1&1%5B0%5D=2&1%5B1%5D%5B0%5D=3'); // Deep array
	expect(qse([1, {a: [2, true]}, 3])).toBe('0=1&1%5Ba%5D%5B0%5D=2&1%5Ba%5D%5B1%5D=true&2=3'); // Mixed
});

test('Stringifies booleans', () => {
	expect(qse([true, false])).toBe('0=true&1=false');
});

test('JS primitives object variants should be treated as their primitives', () => {
	expect(qse([new Boolean()])).toBe('0=false');
	expect(qse({foo: new String('bar')})).toBe('foo=bar');
	expect(qse([new Number(6)])).toBe('0=6');
});

test('Functions and methods should be stripped (no key)', () => {
	expect(qse({a: 1, b: () => {}, c: function(){}})).toBe('a=1');
});

test('Null and undefined should be converted to empty strings (key)', () => {
	expect(qse({a: null, b: undefined, c: 1})).toBe('a=&b=&c=1');
});

test('Ignores Object prototypes properties', () => {
	Object.prototype.foo = 'bar';
	expect(qse({hello: 'world'})).toBe('hello=world');
	delete Object.prototype.foo;
});

test('doesn\'t blow up when Buffer global is missing', () => {
	var tempBuffer = global.Buffer;
	delete global.Buffer;
	expect(qse({a: 'b', c: 'd'})).toBe('a=b&c=d');
	global.Buffer = tempBuffer;
});
