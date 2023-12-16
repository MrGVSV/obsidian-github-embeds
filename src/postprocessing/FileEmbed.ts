import styles from './FileEmbed.module.scss';
import { Settings, SettingsProvider } from '../settings';
import { FileSnippet } from '../client/types';
import { renderMarkdown } from '../utilities';
import { ExpandableEmbed } from './ExpandableEmbed';
import { Shard } from '../components/core';

export class FileEmbed extends ExpandableEmbed {
	protected get rootClass(): string {
		return styles.embed;
	}

	constructor(
		containerEl: HTMLElement,
		private readonly file: FileSnippet,
		settings: SettingsProvider,
	) {
		super(containerEl, settings);
	}

	protected onSettingsChange(prev: Settings | null, curr: Settings) {
		super.onSettingsChange(prev, curr);

		if (prev?.autoOpenThreshold !== curr.autoOpenThreshold) {
			this.tryToggle();
		}
	}

	protected onReload() {
		super.onReload();

		this.tryToggle();
	}

	protected createHeadingPrefix(container: Shard): void {
		const { owner, repo, ref } = this.file;

		const prefix = container.createEl('div', styles.prefix);

		const repoLink = `${owner}/${repo}`;
		prefix.createEl('a', {
			text: repoLink,
			href: `https://github.com/${repoLink}`,
			cls: styles.repoLink,
		});

		const refText = ref.kind === 'branch' ? ref.value : ref.value.slice(0, 7);
		prefix.createEl('a', {
			text: `@${refText}`,
			href: `https://github.com/${repoLink}/tree/${ref.value}`,
			cls: styles.refLink,
		});
	}

	protected createHeading(container: Shard): void {
		const { path, lines, url } = this.file;
		const link = container.createEl('a', { href: url, cls: styles.title });
		link.createSpan({ text: path, cls: styles.linkText });
		const linesText = lines ? `#L${lines.start}${lines.end ? `-L${lines.end}` : ''}` : '';
		link.createSpan({ text: linesText, cls: styles.lines });
	}

	protected createInfo(container: Shard): void {
		// Spacer
		container.createEl('div');
	}

	protected createContent(container: Shard): void {
		const { lang = '', snippetContent } = this.file;
		const content = `\`\`\`${lang}\n${snippetContent}\n\`\`\``;
		renderMarkdown(this.settings.app, content, container.element, this);
	}

	private tryToggle() {
		const lineCount = (this.file.snippetContent.match(/\n/g) || []).length;
		const open = lineCount < this.settings.settings.autoOpenThreshold;
		this.toggle(open);
	}
}
