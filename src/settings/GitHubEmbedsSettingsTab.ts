import { App, PluginSettingTab } from 'obsidian';
import GithubEmbedsPlugin from '../main';
import { DisclaimerSection, FileSection, GithubSection, IssueSection, SupportSection } from './sections';

export class GitHubEmbedsSettingsTab extends PluginSettingTab {
	constructor(
		app: App,
		public plugin: GithubEmbedsPlugin,
	) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new DisclaimerSection(this);
		new GithubSection(this);
		new IssueSection(this);
		new FileSection(this);
		new SupportSection(this);
	}
}
