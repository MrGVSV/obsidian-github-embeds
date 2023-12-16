import { Shard } from './Shard';
import styles from './Icon.module.scss';
import { Color, IconName, Icons } from '../../styles';
import { SettingsProvider } from '../../settings';

/**
 * Base icon component class.
 */
export class Icon extends Shard {
	private color: Color = 'currentColor';

	/**
	 * The SVG element.
	 *
	 * Returns null if the element has not been loaded and attached to the DOM yet.
	 */
	protected get svg(): SVGElement | null {
		return this.element.querySelector('svg');
	}

	constructor(
		private readonly icon: IconName,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(containerEl, settings, 'span', styles.container);
	}

	override onload() {
		super.onload();

		this.element.innerHTML = Icons[this.icon];

		const svg = this.element.querySelector('svg')!;
		svg.setAttr('width', '1.25em');
		svg.setAttr('height', '1.25em');
		svg.setAttr('fill', this.color);
	}

	public withColor(color: Color): this {
		this.color = color;
		return this;
	}
}
