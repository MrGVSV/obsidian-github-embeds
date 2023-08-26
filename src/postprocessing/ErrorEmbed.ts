import { ButtonComponent } from 'obsidian';
import styles from './ErrorEmbed.module.scss';
import { GraphQLError } from 'graphql/error';
import { ApolloError } from '@apollo/client/core';
import { isArray } from '@apollo/client/utilities';
import { EmbedComponent } from './EmbedComponent';

type Reason = string | GraphQLError | ApolloError | Error;

export class ErrorEmbed extends EmbedComponent {
	constructor(
		containerEl: HTMLElement,
		private reason?: Reason | readonly Reason[],
		private retry?: () => void,
	) {
		super(containerEl);
	}
	onload() {
		super.onload();

		const embed = this.containerEl.createDiv(styles.embed);
		const content = embed.createEl('p');

		content.appendText('Error loading GitHub embed');

		if (isArray(this.reason)) {
			content.appendText(`${this.reason.map(this.reasonToString).join('\n')}`);
		} else if (this.reason) {
			content.appendText(`${this.reasonToString(this.reason)}`);
		}

		if (this.retry) {
			new ButtonComponent(embed).setButtonText('Retry').onClick(this.retry);
		}
	}

	private reasonToString(reason: Reason): string {
		if (typeof reason === 'string') {
			return reason;
		}

		if (reason instanceof GraphQLError) {
			return JSON.stringify(reason.toJSON());
		}

		if (reason instanceof ApolloError) {
			return `${reason}`;
		}

		return reason.toString();
	}
}
