import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
	overwrite: true,
	schema: {
		'https://api.github.com/graphql': {
			headers: {
				'authorization': `token ${process.env.GITHUB_TOKEN}`,
				'user-agent': 'node.js',
			},
		},
	},
	documents: 'src/**/*.graphql',
	generates: {
		'src/generated/graphql.schema.ts': {
			plugins: ['typescript'],
		},
		'src/': {
			preset: 'near-operation-file',
			presetConfig: { extension: '.graphql.ts', baseTypesPath: 'generated/graphql.schema.ts' },
			plugins: ['typescript-operations', 'typed-document-node'],
			config: {
				nonOptionalTypename: true,
				skipTypename: false,
				immutableTypes: true,
				useTypeImports: true,
			},
		},
		'src/generated/graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
	hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
