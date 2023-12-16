import { Icon } from './core';
import { PullRequestState } from '../generated/graphql.schema';
import { SettingsProvider } from '../settings';
import { Color, Colors, IconName } from '../styles';

/**
 * Icon class for GitHub pull request states.
 */
export class PullStatusIcon extends Icon {
	constructor(state: PullRequestState, containerEl: HTMLElement, settings: SettingsProvider) {
		super(PullStatusIcon.getIcon(state), containerEl, settings);
		this.withColor(PullStatusIcon.getColor(state)).withTooltip(PullStatusIcon.getTooltip(state));
	}

	private static getIcon(state: PullRequestState): IconName {
		switch (state) {
			case PullRequestState.Closed:
				return 'pr-closed';
			case PullRequestState.Merged:
				return 'pr-merged';
			case PullRequestState.Open:
				return 'pr-open';
		}
	}

	private static getColor(state: PullRequestState): Color {
		switch (state) {
			case PullRequestState.Closed:
				return Colors.closed;
			case PullRequestState.Merged:
				return Colors.resolved;
			case PullRequestState.Open:
				return Colors.open;
		}
	}

	private static getTooltip(state: PullRequestState): string {
		switch (state) {
			case PullRequestState.Closed:
				return 'Pull Request Status: Closed';
			case PullRequestState.Merged:
				return 'Pull Request Status: Merged';
			case PullRequestState.Open:
				return 'Pull Request Status: Open';
		}
	}
}
