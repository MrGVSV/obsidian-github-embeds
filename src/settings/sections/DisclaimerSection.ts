import { BaseSection } from './BaseSection';
import { renderMarkdown } from '../../utilities';
import styles from './DisclaimerSection.module.scss';

export class DisclaimerSection extends BaseSection {
	protected title(): string | undefined {
		return undefined;
	}

	protected onload(): void {
		renderMarkdown(
			this.app,
			`> [!info] Note\n> ${this.disclaimerText}`,
			this.containerEl.createDiv(styles.container),
			this.plugin,
		);
	}

	private get disclaimerText(): string {
		return 'Please note that this plugin currently only renders embeds while in **Reading** view.';
	}
}
