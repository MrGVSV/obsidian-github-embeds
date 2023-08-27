import type * as Types from '../generated/graphql.schema';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type IssueQueryVariables = Types.Exact<{
	owner: Types.Scalars['String']['input'];
	repo: Types.Scalars['String']['input'];
	issue: Types.Scalars['Int']['input'];
}>;

export type IssueQuery = {
	readonly __typename: 'Query';
	readonly repository?: {
		readonly __typename: 'Repository';
		readonly id: string;
		readonly issueOrPullRequest?:
			| {
					readonly __typename: 'Issue';
					readonly id: string;
					readonly number: number;
					readonly url: any;
					readonly title: string;
					readonly bodyHTML: any;
					readonly body: string;
					readonly createdAt: any;
					readonly issueState: Types.IssueState;
					readonly issueStateReason?: Types.IssueStateReason | null;
					readonly issueTitleHTML: string;
					readonly repository: {
						readonly __typename: 'Repository';
						readonly id: string;
						readonly url: any;
						readonly name: string;
						readonly openGraphImageUrl: any;
						readonly owner:
							| { readonly __typename: 'Organization'; readonly login: string }
							| { readonly __typename: 'User'; readonly login: string };
					};
					readonly author?:
						| {
								readonly __typename: 'Bot';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'EnterpriseUserAccount';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'Mannequin';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'Organization';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'User';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| null;
					readonly labels?: {
						readonly __typename: 'LabelConnection';
						readonly edges?: ReadonlyArray<{
							readonly __typename: 'LabelEdge';
							readonly node?: {
								readonly __typename: 'Label';
								readonly id: string;
								readonly url: any;
								readonly name: string;
								readonly color: string;
								readonly description?: string | null;
							} | null;
						} | null> | null;
					} | null;
					readonly comments: { readonly __typename: 'IssueCommentConnection'; readonly totalCount: number };
			  }
			| {
					readonly __typename: 'PullRequest';
					readonly id: string;
					readonly number: number;
					readonly url: any;
					readonly isDraft: boolean;
					readonly title: string;
					readonly bodyHTML: any;
					readonly body: string;
					readonly createdAt: any;
					readonly pullRequestState: Types.PullRequestState;
					readonly pullRequestTitleHTML: any;
					readonly repository: {
						readonly __typename: 'Repository';
						readonly id: string;
						readonly url: any;
						readonly name: string;
						readonly openGraphImageUrl: any;
						readonly owner:
							| { readonly __typename: 'Organization'; readonly login: string }
							| { readonly __typename: 'User'; readonly login: string };
					};
					readonly author?:
						| {
								readonly __typename: 'Bot';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'EnterpriseUserAccount';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'Mannequin';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'Organization';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| {
								readonly __typename: 'User';
								readonly url: any;
								readonly login: string;
								readonly avatarUrl: any;
						  }
						| null;
					readonly labels?: {
						readonly __typename: 'LabelConnection';
						readonly edges?: ReadonlyArray<{
							readonly __typename: 'LabelEdge';
							readonly node?: {
								readonly __typename: 'Label';
								readonly id: string;
								readonly url: any;
								readonly name: string;
								readonly color: string;
								readonly description?: string | null;
							} | null;
						} | null> | null;
					} | null;
					readonly comments: { readonly __typename: 'IssueCommentConnection'; readonly totalCount: number };
			  }
			| null;
	} | null;
};

export type PullRequestFragment = {
	readonly __typename: 'PullRequest';
	readonly id: string;
	readonly number: number;
	readonly url: any;
	readonly isDraft: boolean;
	readonly title: string;
	readonly bodyHTML: any;
	readonly body: string;
	readonly createdAt: any;
	readonly pullRequestState: Types.PullRequestState;
	readonly pullRequestTitleHTML: any;
	readonly repository: {
		readonly __typename: 'Repository';
		readonly id: string;
		readonly url: any;
		readonly name: string;
		readonly openGraphImageUrl: any;
		readonly owner:
			| { readonly __typename: 'Organization'; readonly login: string }
			| { readonly __typename: 'User'; readonly login: string };
	};
	readonly author?:
		| { readonly __typename: 'Bot'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| {
				readonly __typename: 'EnterpriseUserAccount';
				readonly url: any;
				readonly login: string;
				readonly avatarUrl: any;
		  }
		| { readonly __typename: 'Mannequin'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| { readonly __typename: 'Organization'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| { readonly __typename: 'User'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| null;
	readonly labels?: {
		readonly __typename: 'LabelConnection';
		readonly edges?: ReadonlyArray<{
			readonly __typename: 'LabelEdge';
			readonly node?: {
				readonly __typename: 'Label';
				readonly id: string;
				readonly url: any;
				readonly name: string;
				readonly color: string;
				readonly description?: string | null;
			} | null;
		} | null> | null;
	} | null;
	readonly comments: { readonly __typename: 'IssueCommentConnection'; readonly totalCount: number };
};

export type IssueFragment = {
	readonly __typename: 'Issue';
	readonly id: string;
	readonly number: number;
	readonly url: any;
	readonly title: string;
	readonly bodyHTML: any;
	readonly body: string;
	readonly createdAt: any;
	readonly issueState: Types.IssueState;
	readonly issueStateReason?: Types.IssueStateReason | null;
	readonly issueTitleHTML: string;
	readonly repository: {
		readonly __typename: 'Repository';
		readonly id: string;
		readonly url: any;
		readonly name: string;
		readonly openGraphImageUrl: any;
		readonly owner:
			| { readonly __typename: 'Organization'; readonly login: string }
			| { readonly __typename: 'User'; readonly login: string };
	};
	readonly author?:
		| { readonly __typename: 'Bot'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| {
				readonly __typename: 'EnterpriseUserAccount';
				readonly url: any;
				readonly login: string;
				readonly avatarUrl: any;
		  }
		| { readonly __typename: 'Mannequin'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| { readonly __typename: 'Organization'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| { readonly __typename: 'User'; readonly url: any; readonly login: string; readonly avatarUrl: any }
		| null;
	readonly labels?: {
		readonly __typename: 'LabelConnection';
		readonly edges?: ReadonlyArray<{
			readonly __typename: 'LabelEdge';
			readonly node?: {
				readonly __typename: 'Label';
				readonly id: string;
				readonly url: any;
				readonly name: string;
				readonly color: string;
				readonly description?: string | null;
			} | null;
		} | null> | null;
	} | null;
	readonly comments: { readonly __typename: 'IssueCommentConnection'; readonly totalCount: number };
};

export const PullRequestFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'PullRequest' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PullRequest' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'pullRequestState' },
						name: { kind: 'Name', value: 'state' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'isDraft' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'repository' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Repo' } }],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'pullRequestTitleHTML' },
						name: { kind: 'Name', value: 'titleHTML' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'bodyHTML' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'body' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'author' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Author' } }],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'labels' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'first' },
								value: { kind: 'IntValue', value: '20' },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Label' },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'comments' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Repo' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Repository' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'openGraphImageUrl' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'owner' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'login' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Author' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Actor' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'login' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Label' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Label' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'color' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
				],
			},
		},
	],
} as unknown as DocumentNode<PullRequestFragment, unknown>;
export const IssueFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Issue' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Issue' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueState' },
						name: { kind: 'Name', value: 'state' },
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueStateReason' },
						name: { kind: 'Name', value: 'stateReason' },
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'repository' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Repo' } }],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueTitleHTML' },
						name: { kind: 'Name', value: 'titleHTML' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'bodyHTML' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'body' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'author' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Author' } }],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'labels' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'first' },
								value: { kind: 'IntValue', value: '20' },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Label' },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'comments' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Repo' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Repository' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'openGraphImageUrl' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'owner' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'login' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Author' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Actor' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'login' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Label' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Label' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'color' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
				],
			},
		},
	],
} as unknown as DocumentNode<IssueFragment, unknown>;
export const IssueDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Issue' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'repo' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'issue' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'repository' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'repo' } },
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'owner' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'followRenames' },
								value: { kind: 'BooleanValue', value: true },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'issueOrPullRequest' },
									arguments: [
										{
											kind: 'Argument',
											name: { kind: 'Name', value: 'number' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'issue' } },
										},
									],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Issue' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PullRequest' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Repo' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Repository' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'openGraphImageUrl' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'owner' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'login' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Author' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Actor' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'login' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Label' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Label' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: '__typename' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'color' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'Issue' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Issue' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueState' },
						name: { kind: 'Name', value: 'state' },
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueStateReason' },
						name: { kind: 'Name', value: 'stateReason' },
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'repository' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Repo' } }],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'issueTitleHTML' },
						name: { kind: 'Name', value: 'titleHTML' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'bodyHTML' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'body' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'author' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Author' } }],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'labels' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'first' },
								value: { kind: 'IntValue', value: '20' },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Label' },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'comments' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'PullRequest' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PullRequest' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'url' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'pullRequestState' },
						name: { kind: 'Name', value: 'state' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'isDraft' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'repository' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Repo' } }],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'title' } },
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'pullRequestTitleHTML' },
						name: { kind: 'Name', value: 'titleHTML' },
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'bodyHTML' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'body' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'author' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Author' } }],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'labels' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'first' },
								value: { kind: 'IntValue', value: '20' },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'edges' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'node' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'FragmentSpread',
															name: { kind: 'Name', value: 'Label' },
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'comments' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<IssueQuery, IssueQueryVariables>;
