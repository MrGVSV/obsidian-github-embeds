import { Component } from 'obsidian';

/**
 * Base {@link Component} for embeds.
 */
export class EmbedComponent extends Component {
	constructor(public readonly containerEl: HTMLElement) {
		super();
	}
}
