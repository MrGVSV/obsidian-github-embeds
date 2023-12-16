import { Settings, SettingsProvider } from '../settings';
import styles from './ExpandableEmbed.module.scss';
import { EmbedComponent } from './EmbedComponent';
import { Platform } from 'obsidian';
import { Shard } from '../components/core';

/**
 * Base embed component.
 *
 * Sets up creation and reload boilerplate used by expandable embeds.
 */
export abstract class ExpandableEmbed extends EmbedComponent {
	protected abstract get rootClass(): string;

	private _details: Shard;
	private _summary: Shard;
	private _content: Shard;

	protected constructor(
		containerEl: HTMLElement,
		protected readonly settings: SettingsProvider,
	) {
		super(containerEl);
	}

	onload() {
		super.onload();

		this.register(
			this.settings.onSettingsChanged(
				(prev, curr) => {
					if (prev === null || this.shouldReload(prev, curr)) {
						this.reload();
						return;
					}

					this.onSettingsChange(prev, curr);

					if (this.shouldReloadSummary(prev, curr)) {
						this.reloadSummary();
					}

					if (this.shouldReloadContent(prev, curr)) {
						this.reloadContent();
					}
				},
				{ immediate: true },
			),
		);
	}

	onunload() {
		super.onunload();
		this.clear();
	}

	protected abstract createHeadingPrefix(container: Shard): void;

	protected abstract createHeading(container: Shard): void;

	protected abstract createInfo(container: Shard): void;

	protected abstract createContent(content: Shard): void;

	protected onSettingsChange(prev: Settings | null, curr: Settings) {}

	protected shouldReload(prev: Settings | null, curr: Settings): boolean {
		return false;
	}

	protected shouldReloadSummary(prev: Settings | null, curr: Settings): boolean {
		return false;
	}

	protected shouldReloadContent(prev: Settings | null, curr: Settings): boolean {
		return false;
	}

	protected onReload() {}

	public toggle(open?: boolean) {
		this._details.element.toggleAttribute('open', open);
	}

	private reload() {
		this._details = this.addChild(
			new Shard(this.containerEl, this.settings, 'details', { cls: [styles.embed, this.rootClass] }),
		);

		this._summary = this._details.createShard('summary', styles.summary);
		this._content = this._details.createShard('div', styles.content);

		this.onReload();
		this.reloadSummary();
		this.reloadContent();
	}

	private reloadSummary() {
		this._summary.empty();

		const indicator = this._summary.createEl('span', { text: '▶︎', cls: styles.indicator });
		if (Platform.isIosApp) {
			// Help out VoiceOver since it won't give focus to the `<summary />` element
			// (at least, not without making all children unreachable).
			indicator.role = 'button';
			indicator.ariaLabel = 'Expand or collapse embed';
			indicator.tabIndex = 0;
		} else {
			indicator.setAttr('aria-hidden', true);
		}

		const heading = this._summary.createShard('h1', styles.heading);
		this.createHeading(heading);
		if (!heading.hasChildNodes()) {
			this._summary.removeChild(heading);
		}

		const prefix = this._summary.createShard('div', styles.prefix);
		this.createHeadingPrefix(prefix);
		if (!prefix.hasChildNodes()) {
			this._summary.removeChild(prefix);
		}

		const info = this._summary.createShard('div', styles.info);
		this.createInfo(info);
		if (!info.hasChildNodes()) {
			this._summary.removeChild(info);
		}
	}

	private reloadContent() {
		this._content.empty();
		this.createContent(this._content);
	}

	private clear() {
		this._details?.empty();
	}
}
