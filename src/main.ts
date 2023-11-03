import { MarkdownPostProcessorContext } from 'obsidian';
import { Client } from './client';
import { IssueEmbed } from './postprocessing/IssueEmbed';
import { GitHubEmbedsSettingsTab } from './settings/GitHubEmbedsSettingsTab';
import { ErrorEmbed } from './postprocessing/ErrorEmbed';
import { FileUrl, IssueUrl } from './client/types';
import { SettingsProvider } from './settings';
import { FileEmbed } from './postprocessing/FileEmbed';
import { LoadingEmbed } from './postprocessing/LoadingEmbed';
import styles from './styles.scss';
import { EmbedContainer } from './postprocessing/EmbedContainer';

// Initialize Apollo Client __DEV__ variable
window.__DEV__ = process.env.NODE_ENV === 'development';

export default class GithubEmbedsPlugin extends SettingsProvider {
	private client: Client | null = null;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new GitHubEmbedsSettingsTab(this.app, this));

		this.onSettingsChanged(
			(_, settings) => {
				this.client = settings.githubToken ? new Client(settings.githubToken) : null;
			},
			{ immediate: true },
		);

		this.registerMarkdownPostProcessor(async (el, ctx) => {
			const links = Array.from(el.querySelectorAll('a'));
			await Promise.all(links.map((link) => this.processLink(link, ctx)));
		});
	}

	private async processLink(link: HTMLAnchorElement, ctx: MarkdownPostProcessorContext) {
		const parent =
			link.parentElement?.tagName === 'TD' || link.parentElement?.tagName === 'LI'
				? link.parentElement
				: link.parentElement?.parentElement;

		if (!parent) {
			return;
		}

		const createContainer = () => new EmbedContainer(parent.createEl('p', styles.embedContainer), ctx);

		if (Client.isIssueUrl(link.href)) {
			await this.createIssueEmbed(link.href, createContainer());
		} else if (Client.isFileUrl(link.href)) {
			await this.createFileEmbed(link.href, createContainer());
		}
	}

	private async createFileEmbed(fileUrl: FileUrl, container: EmbedContainer) {
		const tryLoad = async () => {
			container.setChild((el) => new LoadingEmbed(el));

			if (!this.settings.githubToken || !this.client) {
				container.setChild((el) => new ErrorEmbed(el, 'missing API token', tryLoad));
				return;
			}

			try {
				const file = await this.client.fetchFile(fileUrl);
				container.setChild((el) => new FileEmbed(el, file, this));
			} catch (error) {
				container.setChild((el) => new ErrorEmbed(el, error, tryLoad));
				return;
			}
		};

		this.onSettingsChanged(
			(prev, curr) => {
				if (!curr.embedFiles) {
					// Remove embeds
					container.empty();
				} else if (!prev?.embedFiles || prev?.githubToken !== curr.githubToken) {
					// Add embeds
					return tryLoad();
				}
			},
			{ immediate: true },
		);
	}

	private async createIssueEmbed(issueUrl: IssueUrl, container: EmbedContainer) {
		const tryLoad = async () => {
			container.setChild((el) => new LoadingEmbed(el));

			if (!this.settings.githubToken || !this.client) {
				container.setChild((el) => new ErrorEmbed(el, 'missing API token', tryLoad));
				return;
			}

			try {
				const { data, errors, error } = await this.client.fetchIssue(issueUrl);

				if (error) {
					container.setChild((el) => new ErrorEmbed(el, error, tryLoad));
					return;
				}

				if (errors) {
					container.setChild((el) => new ErrorEmbed(el, errors, tryLoad));
					return;
				}

				const issue = data.repository?.issueOrPullRequest;
				if (!issue) {
					container.setChild((el) => new ErrorEmbed(el, 'issue or pull request does not exist', tryLoad));
					return;
				}

				container.setChild((el) => new IssueEmbed(el, issue, this));
			} catch (error) {
				container.setChild((el) => new ErrorEmbed(el, error, tryLoad));
				return;
			}
		};

		this.onSettingsChanged(
			(prev, curr) => {
				if (!curr.embedIssues) {
					// Remove embeds
					container.empty();
				} else if (!prev?.embedIssues || prev?.githubToken !== curr.githubToken) {
					// Add embeds
					return tryLoad();
				}
			},
			{ immediate: true },
		);
	}
}
