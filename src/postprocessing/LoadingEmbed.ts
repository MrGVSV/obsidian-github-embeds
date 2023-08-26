import styles from './LoadingEmbed.module.scss';
import { EmbedComponent } from './EmbedComponent';

export class LoadingEmbed extends EmbedComponent {
	private loadingEl: HTMLElement | null = null;
	onload() {
		super.onload();

		this.loadingEl = this.containerEl.createDiv(styles.embed);
		this.loadingEl.createEl('p').appendText('Loading...');
	}
}
