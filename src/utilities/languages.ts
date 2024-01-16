import { App, Component, MarkdownRenderer } from 'obsidian';
import { debug } from './general';

export class Langs {
	/** The loaded PrismJS language tags. */
	private static tags = new Set<string>();
	/** The mapping of file extensions to PrismJS language tag. */
	private static extensions = new Map<string, string>([
		['aspx', 'aspnet'],
		['fs', 'fsharp'],
		['gd', 'gdscript'],
		['h', 'c'],
		['m', 'objc'],
		['mm', 'objc'],
		['text', 'text'],
		['v', 'v'],
		['wat', 'wasm'],
		['wast', 'wasm'],
	]);

	/**
	 * The total number of language tags.
	 */
	public static get size() {
		return this.tags.size;
	}

	/**
	 * Returns the PrismJS language tag for the given tag or file extension if it exists.
	 *
	 * @param tagOrExt The language tag (e.g. `rust`) or file extension (e.g. `rs`)
	 *
	 * @example
	 * Langs.get('rust'); // 'rust'
	 * Langs.get('rs'); // 'rust'
	 * Langs.get('crust'); // undefined
	 */
	public static get(tagOrExt: string) {
		return this.tags.has(tagOrExt) ? tagOrExt : this.extensions.get(tagOrExt);
	}

	/**
	 * Initialize the language map.
	 *
	 * This should be called as early as possible in the plugin's lifecycle
	 * to ensure that the language map is populated before it is used.
	 */
	public static async initialize(app: App, component: Component) {
		if (this.size > 0) {
			return;
		}

		// Force Obsidian to load Prism
		await MarkdownRenderer.render(
			app,
			'```js\n function foo() {} \n```',
			new DocumentFragment().createDiv(),
			'',
			component,
		);

		// Get all loaded PrismJS language tags
		for (const tag of Object.keys(globalThis.Prism.languages)) {
			if (typeof globalThis.Prism.languages[tag] !== 'object') {
				continue;
			}

			if (this.tags.has(tag)) {
				debug(() => console.warn(`Attempted to add language "${tag}" when it already exists`));
				continue;
			}

			this.tags.add(tag);
		}

		// Get CodeMirror language data to map file extensions to language tags
		for (const { name, mode, ext = [] } of globalThis.CodeMirror.modeInfo) {
			// Try and find a corresponding tag for the language name, file extension, or mode (in that order)
			const keys = [name.toLowerCase(), ...ext, mode];
			const tag = keys.find((key) => this.tags.has(key));

			if (!tag) {
				debug(
					() =>
						keys.every((key) => !this.extensions.has(key)) &&
						console.debug(`Could not find language for "${name}"`, ext),
				);
				continue;
			}

			ext.forEach((ext) => {
				const existing = this.extensions.get(ext);
				if (existing && existing !== tag) {
					debug(() =>
						console.warn(
							`Attempted to add extension ".${ext}" for "${name}" when it already exists for "${existing}"`,
						),
					);
				} else {
					this.extensions.set(ext, tag);
				}
			});
		}
	}
}
