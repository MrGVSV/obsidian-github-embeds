import { App, Component, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownRenderer } from 'obsidian';

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
	MarkdownRenderer.render(this.app, markdown, el, '', component).catch((err) => {
		console.error('Error rendering markdown', err);
	});
}

export function replaceChild<C1 extends MarkdownRenderChild, C2 extends MarkdownRenderChild>(
	prev: C1,
	curr: C2,
	ctx: MarkdownPostProcessorContext,
) {
	ctx.addChild(curr);
	prev.containerEl.replaceWith(curr.containerEl);
}
