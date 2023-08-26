import { Variables } from 'graphql-request/src/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { IssueDocument } from '../queries/Issue.graphql';
import { ApolloClient, ApolloQueryResult, DocumentNode, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { RetryLink } from '@apollo/client/link/retry';
import { Content, FileSnippet, FileUrl, IssueUrl } from './types';
import { extractLines, extToLang } from '../utilities';
import { BranchDocument, BranchQueryVariables } from '../queries/Branch.graphql';

const issueRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/(?:issues|pull)\/(\d+)/i;
// This Regex intentionally does not match branches with slashes in them.
// @see https://regex101.com/r/1n33Oh/2
const fileRegex = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/blob\/([^/]+)\/([^#]*)(?:#L(\d+)(?:-L(\d+))?)?/i;

/**
 * The API client used to fetch data from GitHub.
 *
 * This will also manage the GraphQL cache so that duplicate queries
 * can avoid unnecessary network calls.
 */
export class Client {
	private readonly apolloClient: ApolloClient<object>;
	private readonly headers: Headers;

	constructor(token: string) {
		const headers: HeadersInit = {
			'Authorization': `Bearer ${token}`,
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
		};
		this.headers = new Headers(headers);
		this.apolloClient = new ApolloClient({
			link: from([
				new RetryLink(),
				new HttpLink({
					uri: 'https://api.github.com/graphql',
					headers,
				}),
			]),
			cache: new InMemoryCache({
				possibleTypes: {
					Actor: ['User'],
				},
			}),
		});
	}

	/**
	 * Perform a GraphQL query.
	 */
	public async query<T = unknown, V extends Variables = Variables>(
		document: DocumentNode | TypedDocumentNode<T, V>,
		variables?: V,
	): Promise<ApolloQueryResult<T>> {
		return this.apolloClient.query({
			query: document,
			variables,
		});
	}

	/**
	 * Perform a REST request.
	 */
	public async request(endpoint: string, options?: RequestInit) {
		return await fetch(endpoint, {
			...options,
			headers: this.headers,
		});
	}

	/**
	 * Fetch an issue or pull request from a URL.
	 *
	 * @throws If the URL is invalid or if the query failed.
	 *
	 * @see {@link Client.isIssueUrl} to check if a URL is valid.
	 */
	public async fetchIssue(url: IssueUrl) {
		const matches = issueRegex.exec(url);
		if (!matches) {
			throw new Error(`Invalid issue URL: ${url}`);
		}

		const [, owner, repo, issue] = matches;
		return this.query(IssueDocument, {
			owner,
			repo,
			issue: parseInt(issue),
		});
	}

	/**
	 * Fetch a repository branch.
	 *
	 * @throws If the query failed.
	 */
	private async fetchBranch(input: BranchQueryVariables) {
		return this.query(BranchDocument, input);
	}

	/**
	 * Fetch a file from a URL.
	 *
	 * @throws If the URL is invalid or if the request failed.
	 *
	 * @see {@link Client.isFileUrl} to check if a URL is valid.
	 */
	public async fetchFile(fileUrl: FileUrl): Promise<FileSnippet> {
		const matches = fileRegex.exec(fileUrl);
		if (!matches) {
			throw new Error(`Invalid file URL: ${fileUrl}`);
		}

		const [, owner, repo, ref, path, startLine, endLine] = matches;

		const refParam = ref ? `?ref=${ref}` : '';
		const fullContent = await this.request(
			`https://api.github.com/repos/${owner}/${repo}/contents/${path}${refParam}`,
		)
			.then((res) => res.json())
			.then((json: Content) => atob(json.content));

		let isCommit = false;

		if (ref.length === 40) {
			// This might be a Git hash, we can verify this by checking if a branch
			// with this name exists.
			const { data, error, errors } = await this.fetchBranch({
				owner,
				repo,
				branch: ref,
			});
			if (error) {
				throw error;
			}
			if (errors) {
				throw errors[0];
			}

			isCommit = data.repository?.ref === null;
		}

		const start = startLine ? parseInt(startLine) : undefined;
		const end = endLine ? parseInt(endLine) : undefined;

		const snippetContent = extractLines(fullContent, start, end);

		const ext = path.split('.').pop()?.toLowerCase() ?? '';

		return {
			url: fileUrl,
			owner,
			repo,
			path,
			ref: { kind: isCommit ? 'commit' : 'branch', value: ref },
			fullContent,
			snippetContent,
			lines: startLine
				? {
						start: parseInt(startLine),
						end: endLine ? parseInt(endLine) : undefined,
				  }
				: undefined,
			lang: extToLang(ext),
		};
	}

	/**
	 * Check if a URL is a valid issue or pull request URL.
	 *
	 * @example
	 * Client.isIssueUrl('https://github.com/MrGVSV/obsidian-github-embeds/issues/1');
	 * // => true
	 * Client.isIssueUrl('https://github.com/MrGVSV/obsidian-github-embeds/pulls/2');
	 * // => true
	 */
	public static isIssueUrl(url: string): url is IssueUrl {
		return issueRegex.test(url);
	}

	/**
	 * Check if a URL is a valid file URL.
	 *
	 * @example
	 * Client.isFileUrl('https://github.com/MrGVSV/obsidian-github-embeds/blob/main/manifest.json');
	 * // => true
	 * Client.isFileUrl('https://github.com/MrGVSV/obsidian-github-embeds/blob/main/manifest.json#L1-L11');
	 * // => true
	 */
	public static isFileUrl(url: string): url is FileUrl {
		return fileRegex.test(url);
	}
}
