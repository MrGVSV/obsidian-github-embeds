import { Component, MarkdownPostProcessorContext, MarkdownRenderChild } from 'obsidian';

/**
 * Container for embed components.
 *
 * This class is used to manage the lifecycle of embed components,
 * and is itself managed by its {@link MarkdownPostProcessorContext}.
 *
 * Each instance of this class is associated with at most a single component.
 */
export class EmbedContainer {
	private readonly container: MarkdownRenderChild;
	private currentChild: Component | null = null;

	constructor(
		public readonly containerEl: HTMLElement,
		ctx: MarkdownPostProcessorContext,
	) {
		this.container = new MarkdownRenderChild(containerEl);
		ctx.addChild(this.container);
	}

	/**
	 * Set the child component of this container.
	 *
	 * Unloads the previous child component, if any.
	 *
	 * @param child A function to create the child component from the container element.
	 */
	public setChild<T extends Component>(child: (containerEl: HTMLElement) => T): T {
		if (this.currentChild) {
			this.container.removeChild(this.currentChild);
			this.containerEl.empty();
		}

		const component = child(this.containerEl);
		this.currentChild = this.container.addChild(component);
		return component;
	}

	/**
	 * Removes the child component from this container and empties the element.
	 */
	public empty() {
		if (this.currentChild) {
			this.container.removeChild(this.currentChild);
		}

		this.containerEl.empty();
	}
}
