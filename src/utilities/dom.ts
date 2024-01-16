import { App, Component, htmlToMarkdown, MarkdownRenderer } from 'obsidian';
import { Shard } from '../components/core';
import { Langs } from './languages';

/**
 * Find a class in the given class list that matches the given regex.
 */
export function findClass(classList: DOMTokenList, regex: RegExp): RegExpExecArray | null {
	for (const cls of classList) {
		const matches = regex.exec(cls);
		if (matches) {
			return matches;
		}
	}

	return null;
}

/**
 * Renders markdown string to an HTML element.
 *
 * @param app - A reference to the app object
 * @param markdown - The markdown source code
 * @param el - The element to append to
 * @param component - A parent component to manage the lifecycle of the rendered child components.
 */
export function renderMarkdown(app: App, markdown: string, el: HTMLElement, component: Component) {
	MarkdownRenderer.render(app, markdown, el, '', component).catch((err) => {
		console.error('Error rendering markdown', err);
	});
}

/**
 * Sanitizes the HTML in the given shard so that it can be properly rendered by Obsidian.
 */
export function sanitizeHtml(shard: Shard) {
	replaceCodeBlocks(shard);
	replaceAdmonitions(shard);
}

/**
 * Replaces GitHub's code blocks with Obsidian's code blocks.
 *
 * Applies to all descendants of `shard`.
 */
function replaceCodeBlocks(shard: Shard) {
	// GitHub renders their code blocks to a `div > pre` structure.
	// This div has a `data-snippet-clipboard-copy-content` attribute that
	// contains the raw text of the code block.
	const codeBlocks = shard.element.querySelectorAll<HTMLDivElement>('div[data-snippet-clipboard-copy-content]');
	for (const codeBlock of codeBlocks) {
		const pre = codeBlock.querySelector(':scope > pre');
		if (!pre) {
			continue;
		}

		// We can find the code block's language in one of two ways:
		const maybeLang =
			// 1. The `lang` attribute on the `pre` element.
			//    This only exists if the language is not recognized by GitHub.
			pre.getAttribute('lang') ??
			// 2. The `highlight-source-[LANG]` class on the `div` element.
			findClass(codeBlock.classList, /highlight-source-(.*)/)?.[1];

		// Get the corresponding language tag if it exists.
		const tag = (maybeLang && Langs.get(maybeLang)) ?? '';

		const code = codeBlock.getAttribute('data-snippet-clipboard-copy-content');

		codeBlock.empty();
		renderMarkdown(shard.settings.app, `\`\`\`${tag}\n${code}\n\`\`\``, codeBlock, shard);
	}
}

/**
 * Replaces GitHub's admonitions with Obsidian's admonitions.
 *
 * Applies to all descendants of `shard`.
 */
function replaceAdmonitions(shard: Shard) {
	function getAdmonitionType(elt: HTMLElement) {
		if (elt.classList.contains('markdown-alert-note')) {
			return 'note';
		}
		if (elt.classList.contains('markdown-alert-warning')) {
			return 'warning';
		}
		if (elt.classList.contains('markdown-alert-important')) {
			return 'important';
		}
		return null;
	}

	const admonitions = shard.element.querySelectorAll<HTMLDivElement>(
		'div.markdown-alert-note, div.markdown-alert-warning, div.markdown-alert-important',
	);
	for (const admonition of admonitions) {
		const admonitionType = getAdmonitionType(admonition);
		if (!admonitionType) {
			continue;
		}

		const alertTitle = admonition.querySelector(':scope > p.markdown-alert-title');
		if (!alertTitle) {
			continue;
		}

		alertTitle.remove();

		const content = htmlToMarkdown(admonition.innerHTML).replace(/\n/g, '\n> ');
		admonition.empty();

		const admonitionMarkdown = `> [!${admonitionType}]\n> ${content}`;
		renderMarkdown(shard.settings.app, admonitionMarkdown, admonition, shard);
	}
}
