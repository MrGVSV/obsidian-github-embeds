import { htmlToMarkdown, moment, sanitizeHTMLToDom, setIcon } from 'obsidian';
import { IssueFragment, PullRequestFragment } from '../queries/Issue.graphql';
import styles from './IssueEmbed.module.scss';
import { findClass, renderMarkdown } from '../utilities';
import { Label } from '../components';
import { Settings, SettingsProvider } from '../settings';
import { ExpandableEmbed } from './ExpandableEmbed';
import { IssueStateReason, PullRequestState } from '../generated/graphql.schema';

type IssueOrPullRequest = IssueFragment | PullRequestFragment;

export class IssueEmbed extends ExpandableEmbed {
	protected get rootClass(): string {
		return styles.embed;
	}

	constructor(
		containerEl: HTMLElement,
		private issue: IssueOrPullRequest,
		settings: SettingsProvider,
	) {
		super(containerEl, settings);
	}

	protected shouldReloadSummary(prev: Settings | null, curr: Settings): boolean {
		return prev?.labelDisplay !== curr.labelDisplay;
	}

	protected shouldReloadContent(prev: Settings | null, curr: Settings): boolean {
		return prev?.labelDisplay !== curr.labelDisplay;
	}

	protected override createHeadingPrefix(container: HTMLElement): void {
		const { issue } = this;

		container.createEl('a', {
			text: `${issue.repository.owner.login}/${issue.repository.name}`,
			href: issue.repository.url,
			cls: styles.repoLink,
		});
	}
	protected override createHeading(container: HTMLElement): void {
		const { issue } = this;

		const titleHTML = issue.__typename === 'Issue' ? issue.issueTitleHTML : issue.pullRequestTitleHTML;
		container.createEl('a', { text: `#${issue.number}`, href: issue.url, cls: styles.issueNumber });
		container.createDiv({ text: sanitizeHTMLToDom(titleHTML), cls: styles.issueTitle });
	}
	protected override createInfo(container: HTMLElement): void {
		const { issue } = this;

		container.addClass(styles.info);

		const basicInfo = container.createDiv(styles.basicInfo);

		this.createIcon(basicInfo.createDiv());

		if (issue.author) {
			const authorLink = basicInfo.createEl('a', { href: issue.author.url, cls: styles.authorLink });
			authorLink.createEl('img', {
				attr: {
					src: issue.author.avatarUrl,
				},
				cls: styles.authorAvatar,
			});
			authorLink.appendText(issue.author.login);
		}

		const dateContainer = basicInfo.createSpan(styles.date);
		this.register(
			this.settings.onSettingsChanged(
				(prev, curr) => {
					if (prev?.dateFormat === curr.dateFormat) {
						return;
					}

					dateContainer.setText(moment(issue.createdAt).format(curr.dateFormat));
				},
				{ immediate: true },
			),
		);

		const commentContainer = container.createDiv(styles.comments);
		commentContainer.ariaLabel = `Number of comments: ${issue.comments.totalCount}`;
		this.register(
			this.settings.onSettingsChanged(
				(prev, curr) => {
					if (prev?.showTotalComments === curr.showTotalComments) {
						return;
					}

					commentContainer.empty();
					if (curr.showTotalComments) {
						commentContainer.toggleClass(styles.hidden, false);
						setIcon(commentContainer.createSpan(styles.iconContainer), 'message-square');
						commentContainer.createSpan({ text: issue.comments.totalCount.toString() });
					} else {
						commentContainer.toggleClass(styles.hidden, true);
					}
				},
				{ immediate: true },
			),
		);

		const labelsContainer = container.createDiv();
		this.register(
			this.settings.onSettingsChanged(
				(prev, curr) => {
					if (prev?.labelDisplay === curr.labelDisplay) {
						return;
					}

					labelsContainer.empty();
					if (curr.labelDisplay === 'preview') {
						labelsContainer.toggleClass(styles.hidden, false);
						this.createLabelList(labelsContainer);
					} else {
						labelsContainer.toggleClass(styles.hidden, true);
					}
				},
				{ immediate: true },
			),
		);
	}

	protected override createContent(container: HTMLElement) {
		const labelsContainer = container.createDiv();
		this.register(
			this.settings.onSettingsChanged(
				(prev, curr) => {
					if (prev?.labelDisplay === curr.labelDisplay) {
						return;
					}

					labelsContainer.empty();
					if (curr.labelDisplay === 'inside') {
						this.createLabelList(labelsContainer);
					}
				},
				{ immediate: true },
			),
		);

		container.append(sanitizeHTMLToDom(this.issue.bodyHTML));
		this.replaceAdmonitions(container);
		this.replaceCodeBlocks(container);
	}

	private createLabelList(container: HTMLElement) {
		const list = container.createEl('ul', styles.labels);
		for (const label of this.issue.labels?.edges ?? []) {
			if (!label?.node) {
				continue;
			}

			const item = list.createEl('li');
			this.addChild(new Label(item, label.node, this.settings.app));
		}
	}

	private replaceCodeBlocks(container: HTMLElement) {
		// GitHub renders their code blocks to a `div > pre` structure.
		// This div has a `data-snippet-clipboard-copy-content` attribute that
		// contains the raw text of the code block.
		const codeBlocks = container.querySelectorAll<HTMLDivElement>('div[data-snippet-clipboard-copy-content]');
		for (const codeBlock of codeBlocks) {
			const pre = codeBlock.querySelector(':scope > pre');
			if (!pre) {
				continue;
			}

			// We can find the code block's language in one of two ways:
			const lang =
				// 1. The `lang` attribute on the `pre` element.
				//    This only exists if the language is not recognized by GitHub.
				pre.getAttribute('lang') ??
				// 2. The `highlight-source-[LANG]` class on the `div` element.
				findClass(codeBlock.classList, /highlight-source-(.*)/)?.[1];

			const code = codeBlock.getAttribute('data-snippet-clipboard-copy-content');

			codeBlock.empty();
			this.renderMarkdown(`\`\`\`${lang}\n${code}\n\`\`\``, codeBlock);
		}
	}

	/**
	 * Replaces GitHub's admonitions with Obsidian's admonitions.
	 *
	 * Applies to all descendants of `container`.
	 */
	private replaceAdmonitions(container: HTMLElement) {
		const admonitions = container.querySelectorAll<HTMLDivElement>(
			'div.markdown-alert-note, div.markdown-alert-warning',
		);
		for (const admonition of admonitions) {
			const admonitionType = admonition.classList.contains('markdown-alert-note') ? 'note' : 'warning';

			const lineBreak = admonition.querySelector(':scope > p > br');
			if (!lineBreak) {
				continue;
			}

			// Remove `Note` or `Warning` from the start of the admonition.
			lineBreak.previousSibling?.remove();
			// Remove the line break itself.
			lineBreak.remove();

			const content = htmlToMarkdown(admonition.innerHTML).replace(/\n/g, '\n> ');
			admonition.empty();

			const admonitionMarkdown = `> [!${admonitionType}]\n> ${content}`;
			this.renderMarkdown(admonitionMarkdown, admonition);
		}
	}

	private renderMarkdown(markdown: string, el: HTMLElement) {
		renderMarkdown(this.settings.app, markdown, el, this);
	}

	private createIcon(container: HTMLElement) {
		const { issue } = this;

		if (issue.__typename === 'PullRequest') {
			switch (issue.pullRequestState) {
				case PullRequestState.Open:
					if (issue.isDraft) {
						setIcon(container, 'git-pull-request-draft');
						container.addClass(styles.draft);
						container.ariaLabel = 'Pull Request Status: Draft';
					} else {
						setIcon(container, 'git-pull-request');
						container.addClass(styles.open);
						container.ariaLabel = 'Pull Request Status: Open';
					}
					break;
				case PullRequestState.Closed:
					setIcon(container, 'git-pull-request-closed');
					container.addClass(styles.closed);
					container.ariaLabel = 'Pull Request Status: Closed';
					break;
				case PullRequestState.Merged:
					setIcon(container, 'git-merge');
					container.addClass(styles.merged);
					container.ariaLabel = 'Pull Request Status: Merged';
					break;
			}
		} else {
			switch (issue.issueStateReason) {
				case IssueStateReason.NotPlanned:
					setIcon(container, 'circle-slash');
					container.addClass(styles.draft);
					container.ariaLabel = 'Issue Status: Not planned';
					break;
				case IssueStateReason.Completed:
					setIcon(container, 'check-circle-2');
					container.addClass(styles.merged);
					container.ariaLabel = 'Issue Status: Completed';
					break;
				default:
					setIcon(container, 'circle-dot');
					container.addClass(styles.open);
					container.ariaLabel = 'Issue Status: Open';
					break;
			}
		}
	}
}
