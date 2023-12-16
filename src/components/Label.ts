import styles from './Label.module.scss';
import tinycolor from 'tinycolor2';
import { Shard } from './core';
import { SettingsProvider } from '../settings';
import { LabelFragment } from '../queries/fragments.graphql';

/**
 * Component to display a GitHub label.
 */
export class Label extends Shard {
	constructor(
		parent: HTMLElement,
		settings: SettingsProvider,
		private data: LabelFragment,
	) {
		super(parent, settings, 'div', styles.label);
	}

	onload() {
		super.onload();

		const { name, description, url, color } = this.data;

		const labelColor = tinycolor(`#${color}`);
		const rgb = labelColor.toRgb();
		const hsl = labelColor.toHsl();

		this.element.setAttr(
			'style',
			[
				`--label-r: ${rgb.r}`,
				`--label-g: ${rgb.g}`,
				`--label-b: ${rgb.b}`,
				`--label-h: ${hsl.h}`,
				`--label-s: ${Math.floor(hsl.s * 100)}`,
				`--label-l: ${Math.floor(hsl.l * 100)}`,
			].join('; '),
		);

		this.createEl('a', { href: url, text: name });

		this.settings.onCssChange(
			this,
			({ isDarkMode }) => {
				this.element?.toggleClass(styles.dark, isDarkMode);
			},
			{ immediate: true },
		);

		const desc = description ? `: ${description}` : '';
		this.withTooltip(`${name}${desc}`);
	}
}
