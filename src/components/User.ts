import { UserFragment } from '../queries/fragments.graphql';
import { SettingsProvider } from '../settings';
import { Shard } from './core';
import styles from './User.module.scss';

/**
 * A shard representing a GitHub user.
 */
export class User extends Shard {
	constructor(
		protected readonly user: UserFragment,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(containerEl, settings, 'div', styles.container);
	}

	override onload() {
		super.onload();

		const authorLink = this.createEl('a', {
			href: this.user.url,
			cls: styles.link,
			text: this.user.login,
		});

		authorLink.createEl('img', {
			attr: {
				src: this.user.avatarUrl,
			},
			cls: styles.avatar,
			text: this.user.login,
		});
	}
}

/**
 * A shard representing an issue author.
 */
export class Author extends User {
	override onload() {
		super.onload();

		this.withTooltip(`Created by ${this.user.login}`);
	}
}
