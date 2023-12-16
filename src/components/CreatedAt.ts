import { DateLabel } from './core';

/**
 * A shard representing a creation date.
 */
export class CreatedAt extends DateLabel {
	override oninit() {
		super.oninit();

		this.withTooltip(`Created at ${this.getFormattedDate()}`);
	}
}
