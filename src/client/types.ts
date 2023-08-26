export type IssueUrl = string & { _brand: 'issue' };
export type FileUrl = string & { _brand: 'file' };

export interface RepoInfo {
	readonly owner: string;
	readonly repo: string;
}

export interface FileSnippet extends RepoInfo {
	readonly url: FileUrl;
	readonly ref: Ref;
	readonly path: string;
	readonly lang?: string;
	readonly fullContent: string;
	readonly snippetContent: string;
	readonly lines?: {
		readonly start: number;
		readonly end?: number;
	};
}

export interface Ref {
	readonly kind: 'branch' | 'commit';
	readonly value: string;
}

/**
 * @see https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
 */
export interface Content {
	type: string;
	size: number;
	name: string;
	path: string;
	content: string;
	sha: string;
	url: string;
	git_url: string | null;
	html_url: string | null;
	download_url: string | null;
}
