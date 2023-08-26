import { Settings, SettingsProvider } from '../settings';
import styles from './ExpandableEmbed.module.scss';
import { isIOS } from '../utilities';
import { EmbedComponent } from './EmbedComponent';

/**
 * Base embed component.
 *
 * Sets up creation and reload boilerplate used by expandable embeds.
 */
export abstract class ExpandableEmbed extends EmbedComponent {
	private detailsEl: HTMLDetailsElement;
	private summaryEl: HTMLElement;
	private contentEl: HTMLDivElement;
	protected abstract get rootClass(): string;

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

	public toggle(open?: boolean) {
		this.detailsEl.toggleAttribute('open', open);
	}

	protected abstract createHeadingPrefix(container: HTMLElement): void;
	protected abstract createHeading(container: HTMLElement): void;
	protected abstract createInfo(container: HTMLElement): void;
	protected abstract createContent(contentEl: HTMLDivElement): void;

	protected onSettingsChange(prev: Settings | null, curr: Settings) {}

	/** @virtual */
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

	private reload() {
		this.containerEl.empty();

		this.detailsEl = this.containerEl.createEl('details', {
			cls: [styles.embed, this.rootClass],
		});
		this.summaryEl = this.detailsEl.createEl('summary', styles.summary);
		this.contentEl = this.detailsEl.createDiv(styles.content);

		this.onReload();
		this.reloadSummary();
		this.reloadContent();
	}

	private reloadSummary() {
		this.summaryEl.empty();

		const indicator = this.summaryEl.createSpan({ text: '▶︎', cls: styles.indicator });
		if (isIOS()) {
			// Help out VoiceOver since it won't give focus to the `<summary />` element
			// (at least, not without making all children unreachable).
			indicator.role = 'button';
			indicator.ariaLabel = 'Expand or collapse embed';
			indicator.tabIndex = 0;
		} else {
			indicator.setAttr('aria-hidden', true);
		}

		const heading = this.summaryEl.createEl('h1', styles.heading);
		this.createHeading(heading);
		if (!heading.hasChildNodes()) {
			heading.remove();
		}

		const prefix = this.summaryEl.createDiv(styles.prefix);
		this.createHeadingPrefix(prefix);
		if (!prefix.hasChildNodes()) {
			prefix.remove();
		}

		const info = this.summaryEl.createDiv(styles.info);
		this.createInfo(info);
		if (!info.hasChildNodes()) {
			info.remove();
		}
	}

	private reloadContent() {
		this.contentEl.empty();

		this.createContent(this.contentEl);
	}
}
