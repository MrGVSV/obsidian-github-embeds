import { Shard } from './Shard';
import styles from './TextLabel.module.scss';
import { IconName } from '../../styles';
import { SettingsProvider } from '../../settings';
import { Icon } from './Icon';

/**
 * A shard representing a label with optional text and icon elements.
 */
export class TextLabel extends Shard {
	private text: string = '';
	private icon: IconName | null = null;

	constructor(containerEl: HTMLElement, settings: SettingsProvider) {
		super(containerEl, settings, 'div', styles.container);
	}

	public withIcon(icon: IconName): this {
		this.icon = icon;
		return this;
	}

	public withText(text: string): this {
		this.text = text;
		return this;
	}

	override onload() {
		super.onload();

		if (this.icon) {
			this.addChild(new Icon(this.icon, this.element, this.settings));
		}
		this.createEl('span', { text: this.text });
	}
}
