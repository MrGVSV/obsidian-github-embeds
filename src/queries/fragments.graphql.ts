import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Author_Bot_Fragment = {
	readonly __typename: 'Bot';
	readonly url: any;
	readonly login: string;
	readonly avatarUrl: any;
};

export type Author_EnterpriseUserAccount_Fragment = {
	readonly __typename: 'EnterpriseUserAccount';
	readonly url: any;
	readonly login: string;
	readonly avatarUrl: any;
};

export type Author_Mannequin_Fragment = {
	readonly __typename: 'Mannequin';
	readonly url: any;
	readonly login: string;
	readonly avatarUrl: any;
};

export type Author_Organization_Fragment = {
	readonly __typename: 'Organization';
	readonly url: any;
	readonly login: string;
	readonly avatarUrl: any;
};

export type Author_User_Fragment = {
	readonly __typename: 'User';
	readonly url: any;
	readonly login: string;
	readonly avatarUrl: any;
};

export type AuthorFragment =
	| Author_Bot_Fragment
	| Author_EnterpriseUserAccount_Fragment
	| Author_Mannequin_Fragment
	| Author_Organization_Fragment
	| Author_User_Fragment;

export type LabelFragment = {
	readonly __typename: 'Label';
	readonly id: string;
	readonly url: any;
	readonly name: string;
	readonly color: string;
	readonly description?: string | null;
};

export type RepoFragment = {
	readonly __typename: 'Repository';
	readonly id: string;
	readonly url: any;
	readonly name: string;
	readonly openGraphImageUrl: any;
	readonly owner:
		| { readonly __typename: 'Organization'; readonly login: string }
		| { readonly __typename: 'User'; readonly login: string };
};

export const AuthorFragmentDoc = {
	kind: 'Document',
	definitions: [
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
	],
} as unknown as DocumentNode<AuthorFragment, unknown>;
export const LabelFragmentDoc = {
	kind: 'Document',
	definitions: [
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
} as unknown as DocumentNode<LabelFragment, unknown>;
export const RepoFragmentDoc = {
	kind: 'Document',
	definitions: [
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
	],
} as unknown as DocumentNode<RepoFragment, unknown>;
