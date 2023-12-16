import { Shard } from './Shard';
import { MomentInput } from 'moment';
import styles from './DateLabel.module.scss';
import { moment } from 'obsidian';
import { SettingsProvider } from '../../settings';

/**
 * A shard for representing a date.
 */
export class DateLabel extends Shard {
	constructor(
		protected readonly date: MomentInput,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(containerEl, settings, 'span', styles.container);

		this.element.setText(this.getFormattedDate());
	}

	protected getFormattedDate(): string {
		return moment(this.date).format(this.settings.settings.dateFormat);
	}
}
