import { App, Component } from 'obsidian';
import { GitHubEmbedsSettingsTab } from '../GitHubEmbedsSettingsTab';
import GithubEmbedsPlugin from '../../main';
import styles from './BaseSection.module.scss';

export abstract class BaseSection {
	protected readonly app: App;
	protected readonly plugin: GithubEmbedsPlugin;
	protected readonly containerEl: HTMLElement;

	constructor(tab: GitHubEmbedsSettingsTab) {
		this.app = tab.app;
		this.plugin = tab.plugin;
		this.containerEl = tab.containerEl;

		this.containerEl.addClass(styles.container);

		const title = this.title();
		if (title) {
			this.containerEl.createEl('h2', { text: title });
		}

		this.onload();
	}

	protected abstract title(): string | undefined;
	protected abstract onload(): void;

	protected resettable<T extends Component>() {}
}
