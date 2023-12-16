/**
 * A collection of GitHub icons.
 */
export const Icons = {
	'comment': require('assets/comment.svg'),
	'pr-draft': require('assets/git-pull-request-draft.svg'),
	'pr-open': require('assets/git-pull-request.svg'),
	'pr-closed': require('assets/git-pull-request-closed.svg'),
	'pr-merged': require('assets/git-merge.svg'),
	'issue-draft': require('assets/issue-draft.svg'),
	'issue-open': require('assets/issue-opened.svg'),
	'issue-closed': require('assets/skip.svg'),
	'issue-completed': require('assets/issue-closed.svg'),
	'issue-reopened': require('assets/issue-reopened.svg'),
} as const;

export type IconName = keyof typeof Icons;
