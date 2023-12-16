import styles from './LabelList.module.scss';
import { Label } from './Label';
import { Shard } from './core';
import { LabelConnectionFragment, LabelFragment } from '../queries/fragments.graphql';
import { SettingsProvider } from '../settings';
import { reduceConnection } from '../utilities';

export class LabelList extends Shard {
	private readonly labels: readonly LabelFragment[] = [];

	constructor(
		labels: LabelFragment[] | LabelConnectionFragment | null | undefined,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(containerEl, settings, 'ul', { cls: styles.container });

		this.labels = Array.isArray(labels) ? labels : reduceConnection(labels);
	}

	override onload() {
		super.onload();

		for (const label of this.labels) {
			if (!label) {
				continue;
			}

			const item = this.createEl('li');
			this.addChild(new Label(item, this.settings, label));
		}
	}
}
