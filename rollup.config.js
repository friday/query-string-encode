import uglify from 'rollup-plugin-uglify';

const name = 'queryStringEncode';
const pkg = require('./package');
const amd = {id: pkg.name};
const input = `dist/index.js`;
const banner = `/*! ${name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} | Licensed under ${pkg.license} */`;

const comments = (node, {type, value}) => type === "comment2" && value.startsWith('!'); // keep banner when minifying
const config = (format, {minify = false, isDefault = false} = {}) => {
	const output = {amd, format, banner, sourcemap: minify, file: `dist/${pkg.name}${isDefault ? '' :  `.${format}`}${minify ? '.min' : ''}.js`};
	const plugins = minify ? [uglify({output: {comments}})] : [];
	return {name, input, output, plugins};
};

export default [
	config('iife', {isDefault: true}),
	config('iife', {isDefault: true, minify: true}),
	config('amd'),
	config('cjs'),
	config('es'),
	config('umd'),
	config('umd', {minify: true}),
];
