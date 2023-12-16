import { TextLabel } from './core';
import { SettingsProvider } from '../settings';

/**
 * A shard representing a comment count.
 */
export class CommentCount extends TextLabel {
	constructor(
		private readonly count: number,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(containerEl, settings);

		this.withText(count.toString())
			.withIcon('comment')
			.withTooltip(`${this.count} comment${this.count === 1 ? '' : 's'}`);
	}
}
