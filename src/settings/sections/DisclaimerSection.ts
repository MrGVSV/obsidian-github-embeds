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
			`> [!caution] Caution\n> ${this.cautionText}`,
			this.containerEl.createDiv(styles.container),
			this.plugin,
		);
		renderMarkdown(
			this.app,
			`> [!info] Note\n> ${this.disclaimerText}`,
			this.containerEl.createDiv(styles.container),
			this.plugin,
		);
	}

	private get cautionText(): string {
		return 'Please take caution when syncing this vault. GitHub token is stored in plaintext in `./.obsidian/plugins/github-embeds/data.json`.';
	}

	private get disclaimerText(): string {
		return 'Please note that this plugin currently only renders embeds while in **Reading** view.';
	}
}
