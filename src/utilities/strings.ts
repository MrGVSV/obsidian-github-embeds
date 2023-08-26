/**
 * Extracts a range of lines from a string.
 *
 * @param text The text
 * @param startLine The starting line (inclusive, 1-indexed)
 * @param endLine The ending line (inclusive, 1-indexed)
 */
export function extractLines(text: string, startLine?: number, endLine?: number): string {
	return splicePatternRange(text, /\n|\r\n/, typeof startLine === 'number' ? startLine - 1 : startLine, endLine);
}

/**
 * Splices a string across a range of occurrences of a pattern.
 *
 * @example
 * splicePatternRange('Foo\n\nBar\nBaz', '\n');
 * // => 'Foo\n\nBar\nBaz'
 * splicePatternRange('Foo\n\nBar\nBaz', '\n', 0);
 * // => 'Foo'
 * splicePatternRange('Foo\n\nBar\nBaz', '\n', 0, 0);
 * // => 'Foo'
 * splicePatternRange('Foo\n\nBar\nBaz', '\n', 0, 1);
 * // => 'Foo'
 * splicePatternRange('Foo\n\nBar\nBaz', '\n', 0, 3);
 * // => 'Foo\n\nBar'
 *
 * @param text The text to splice
 * @param pattern The pattern to splice on
 * @param startOccurrence The starting occurrence to start the splice at
 * @param endOccurrence The ending occurrence to end the splice at
 */
function splicePatternRange(
	text: string,
	pattern: string | RegExp,
	startOccurrence?: number,
	endOccurrence?: number,
): string {
	if (startOccurrence === undefined && endOccurrence === undefined) {
		return text;
	}

	if (startOccurrence === endOccurrence) {
		endOccurrence = (startOccurrence ?? 0) + 1;
	}

	// Create a capture group so that the split pattern is included in the result
	const regex = new RegExp(`(${typeof pattern === 'string' ? pattern : pattern.source})`);

	// Multiply by 2 because the capture group doubles the number of results
	const start = typeof startOccurrence === 'number' ? startOccurrence * 2 : 0;
	// If `endOccurrence` is undefined, then we just want to capture just the first occurrence
	const end = typeof endOccurrence === 'number' ? 1 + (endOccurrence - 1) * 2 : start + 1;

	return text.split(regex).slice(start, end).join('');
}
