/**
 * Maps file extensions to language names supported by PrismJS.
 *
 * This list only contains languages whose extensions are not already a valid language
 * tag recognized by PrismJS.
 */
const LanguageExt = new Map<string, string>(
	Object.entries({
		bf: 'brainfuck',
		fs: 'fsharp',
		gd: 'gdscript',
		h: 'c',
		m: 'objc',
		rs: 'rust',
		txt: '',
		text: '',
	}),
);

/**
 * Returns a guess for what PrismJS language tag matches the given extension.
 *
 * If no match is found, the extension itself is returned by default.
 *
 * @param ext The extension without a leading dot (`.`)
 */
export function extToLang(ext: string): string {
	return LanguageExt.get(ext) ?? ext;
}
