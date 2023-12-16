import { sanitizeHTMLToDom } from 'obsidian';
import styles from './IssueEmbed.module.scss';
import { ExpandableEmbed } from './ExpandableEmbed';
import { IssueFragment, PullRequestFragment } from '../queries/Issue.graphql';
import { Settings, SettingsProvider } from '../settings';
import { Shard } from '../components/core';
import { Author, CommentCount, CreatedAt, IssueStatusIcon, LabelList, PullStatusIcon } from '../components';

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
		return (
			prev?.labelDisplay !== curr.labelDisplay ||
			prev.dateFormat !== curr.dateFormat ||
			prev.showTotalComments !== curr.showTotalComments
		);
	}

	protected shouldReloadContent(prev: Settings | null, curr: Settings): boolean {
		return prev?.labelDisplay !== curr.labelDisplay;
	}

	protected override createHeadingPrefix(container: Shard): void {
		const { issue } = this;

		container.createShard('a', {
			text: `${issue.repository.owner.login}/${issue.repository.name}`,
			href: issue.repository.url,
			cls: styles.repoLink,
		});
	}

	protected override createHeading(container: Shard): void {
		const { issue } = this;

		const titleHTML = issue.__typename === 'Issue' ? issue.issueTitleHTML : issue.pullRequestTitleHTML;
		container.createShard('a', {
			text: `#${issue.number}`,
			href: issue.url,
			cls: styles.issueNumber,
		});
		container.createShard('div', {
			text: sanitizeHTMLToDom(titleHTML),
			cls: styles.issueTitle,
		});
	}

	protected override createInfo(container: Shard): void {
		const {
			issue,
			settings: {
				settings: { labelDisplay, showTotalComments },
			},
		} = this;

		container.addChild(
			issue.__typename === 'Issue'
				? new IssueStatusIcon(issue.issueState, issue.issueStateReason, container.element, this.settings)
				: new PullStatusIcon(issue.pullRequestState, container.element, this.settings),
		);

		if (issue.author) {
			container.addChild(new Author(issue.author, container.element, this.settings));
		}

		container.addChild(new CreatedAt(issue.createdAt, container.element, this.settings));

		if (showTotalComments) {
			this.addChild(new CommentCount(issue.comments.totalCount, container.element, this.settings));
		}

		if (labelDisplay === 'preview') {
			container.addChild(new LabelList(this.issue.labels, container.element, this.settings));
		}
	}

	protected override createContent(container: Shard) {
		if (this.settings.settings.labelDisplay === 'inside') {
			container.addChild(new LabelList(this.issue.labels, container.element, this.settings));
		}

		container.insertHtml(this.issue.bodyHTML, 'div');
	}
}
