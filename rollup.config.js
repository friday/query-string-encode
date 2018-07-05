import {terser} from 'rollup-plugin-terser';

const name = 'queryStringEncode';
const pkg = require('./package');
const amd = {id: pkg.name};
const input = 'dist/index.js';
const banner = `/*! ${name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} | Licensed under ${pkg.license} */`;
const comments = (node, {type, value}) => type === "comment2" && value.startsWith('!'); // keep banner when minifying
const formats = {amd: 'amd.js', cjs: 'cjs.js', es: 'mjs', umd: 'js'};

export default [
	{
		input,
		output: Object.entries(formats).map(([format, ext]) => ({amd, banner, name, format, file: `dist/${pkg.name}.${ext}`})),
	},
	{
		input,
		output: {amd, banner, name, file: `dist/${pkg.name}.min.js`, format: 'umd', sourcemap: true},
		plugins: [terser({output: {comments}})],
	}
];
