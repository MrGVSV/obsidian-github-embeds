import type * as Types from '../generated/graphql.schema';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BranchQueryVariables = Types.Exact<{
	owner: Types.Scalars['String']['input'];
	repo: Types.Scalars['String']['input'];
	branch: Types.Scalars['String']['input'];
}>;

export type BranchQuery = {
	readonly __typename: 'Query';
	readonly repository?: {
		readonly __typename: 'Repository';
		readonly ref?: { readonly __typename: 'Ref'; readonly id: string } | null;
	} | null;
};

export const BranchDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Branch' },
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'branch' } },
					type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
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
								name: { kind: 'Name', value: 'owner' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'owner' } },
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'repo' } },
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'ref' },
									arguments: [
										{
											kind: 'Argument',
											name: { kind: 'Name', value: 'qualifiedName' },
											value: { kind: 'Variable', name: { kind: 'Name', value: 'branch' } },
										},
									],
									selectionSet: {
										kind: 'SelectionSet',
										selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<BranchQuery, BranchQueryVariables>;
