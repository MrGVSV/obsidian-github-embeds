import { Icon } from './core';
import { IssueState, IssueStateReason } from '../generated/graphql.schema';
import { SettingsProvider } from '../settings';
import { Color, Colors, IconName } from '../styles';

/**
 * Icon class for GitHub issue states.
 */
export class IssueStatusIcon extends Icon {
	constructor(
		state: IssueState,
		reason: IssueStateReason | null | undefined,
		containerEl: HTMLElement,
		settings: SettingsProvider,
	) {
		super(IssueStatusIcon.getIcon(state, reason), containerEl, settings);
		this.withColor(IssueStatusIcon.getColor(state, reason)).withTooltip(IssueStatusIcon.getTooltip(state, reason));
	}

	private static getIcon(state: IssueState, reason?: IssueStateReason | null): IconName {
		switch (state) {
			case IssueState.Open:
				return reason === IssueStateReason.Reopened ? 'issue-reopened' : 'issue-open';
			case IssueState.Closed:
				return reason === IssueStateReason.Completed ? 'issue-completed' : 'issue-closed';
		}
	}

	private static getColor(state: IssueState, reason?: IssueStateReason | null): Color {
		switch (state) {
			case IssueState.Open:
				return Colors.open;
			case IssueState.Closed:
				return reason === IssueStateReason.Completed ? Colors.resolved : Colors.draft;
		}
	}

	private static getTooltip(state: IssueState, reason?: IssueStateReason | null): string {
		switch (state) {
			case IssueState.Open:
				return reason === IssueStateReason.Reopened ? 'Issue Status: Reopened' : 'Issue Status: Open';
			case IssueState.Closed:
				return reason === IssueStateReason.Completed
					? 'Issue Status: Closed as Completed'
					: 'Issue Status: Closed as Not Planned';
		}
	}
}
