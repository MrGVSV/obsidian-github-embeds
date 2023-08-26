import styles from './Label.module.scss';
import { App, Component } from 'obsidian';
import { isDarkMode, onCssChange } from '../utilities';
import { LabelFragment } from '../queries/fragments.graphql';
import tinycolor from 'tinycolor2';

/**
 * Component to display a GitHub label.
 */
export class Label extends Component {
	private labelEl: HTMLDivElement | null = null;
	private linkEl: HTMLAnchorElement | null = null;
	constructor(
		private containerEl: HTMLElement,
		private data: LabelFragment,
		private app: App,
	) {
		super();
	}

	onload() {
		super.onload();

		this.labelEl = this.containerEl.createDiv(styles.label);
		this.labelEl.ariaLabel = this.data.description ?? null;

		const color = tinycolor(`#${this.data.color}`);
		const rgb = color.toRgb();
		const hsl = color.toHsl();

		this.labelEl.setAttr(
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

		this.linkEl = this.labelEl.createEl('a');
		this.linkEl.text = this.data.name;
		this.linkEl.href = this.data.url;

		this.setStyles(isDarkMode(this.app));

		this.registerEvent(onCssChange(this.app, (isDarkMode) => this.setStyles(isDarkMode)));
	}

	private setStyles(isDarkMode: boolean) {
		this.labelEl?.toggleClass(styles.dark, isDarkMode);
	}
}
