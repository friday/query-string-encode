export default function queryStringEncode(input: any): string {
	// Avoid [].includes (needs to be polyfilled)
	if (!input || [Array, Object].indexOf(input.constructor) === -1) {
		// Always return string, even for inputs that can't be serialized
		return "";
	}
	const flattened: Array<[string, string|number|boolean]> = [];
	(function flatten(input: any, path: string[]): void {
		if (!input || [Boolean, Number, String].indexOf(input.constructor) !== -1) {
			const serializedPath = path.map((key, index) => index ? `[${key}]` : key).join("");
			// Replace null and undefined with empty strings
			flattened.push([serializedPath, input == null ? "" : input]);
		} else if ([Array, Object].indexOf(input.constructor) !== -1) {
			for (const key in input) {
				if (input.hasOwnProperty(key)) {
					flatten(input[key], path.concat([key]));
				}
			}
		}
	})(input, []);
	return flattened.map(pair => pair.map(encodeURIComponent).join("=")).join("&");
}
