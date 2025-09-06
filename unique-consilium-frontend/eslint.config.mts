/**
 * App Router + TS + Carbon workspace — minimal diff; no new deps; plugins conditional.
 * Flat Config (ESM) for ESLint 8.x/Node 22.
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const isProd = process.env.NODE_ENV === 'production';

// Conditionally load plugins available in the workspace (no new deps added)
let nextPlugin: any = null;
let tsParser: any = null;
let tsPlugin: any = null;
let reactPlugin: any = null;
let reactHooksPlugin: any = null;
let jsxA11yPlugin: any = null;
let importPlugin: any = null;

try { nextPlugin = require('@next/eslint-plugin-next'); } catch {}
try { tsParser = require('@typescript-eslint/parser'); } catch {}
try { tsPlugin = require('@typescript-eslint/eslint-plugin'); } catch {}
try { reactPlugin = require('eslint-plugin-react'); } catch {}
try { reactHooksPlugin = require('eslint-plugin-react-hooks'); } catch {}
try { jsxA11yPlugin = require('eslint-plugin-jsx-a11y'); } catch {}
try { importPlugin = require('eslint-plugin-import'); } catch {}

// Shared, safe core rules
const coreRules = {
	'no-console': [isProd ? 'error' : 'warn', { allow: ['warn', 'error', 'info'] }],
	'no-debugger': 'error',
	eqeqeq: 'error',
	curly: 'error',
	'prefer-const': 'warn',
	// Soft guardrails for inline styles and Tailwind-like classes
	'no-restricted-syntax': [
		'warn',
		{
			selector: "JSXAttribute[name.name='style']",
			message: 'Inline styles discouraged. Use Carbon tokens and SCSS utilities.',
		},
		{
			selector:
				"JSXAttribute[name.name='className'] Literal[value=/\\b(mt-|mb-|ml-|mr-|mx-|my-|px-|py-|flex|grid|items-|justify-)/]",
			message: 'Tailwind-like classes discouraged. Use Carbon grid and SCSS tokens.',
		},
	],
} as const;

// Next.js plugin rules (only if available)
const nextRules = nextPlugin
	? {
		'@next/next/no-sync-scripts': 'error',
		'@next/next/no-document-import-in-page': 'error',
		'@next/next/no-html-link-for-pages': 'off',
		'@next/next/no-img-element': 'warn',
	}
	: {};

// React plugin rules (optional)
const reactRules = reactPlugin
	? {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
		}
	: {};

// React Hooks (optional)
const hooksRules = reactHooksPlugin
	? {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		}
	: {};

// TypeScript rules (optional)
const tsRules = tsPlugin
	? {
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
		}
	: {};

// Import hygiene (optional)
const importRules = importPlugin
	? {
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					'newlines-between': 'always',
				},
			],
		}
	: {};

export default [
	// Ignores
	{
		ignores: [
			'**/node_modules/**',
			'**/.next/**',
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/public/**',
			'**/*.min.*',
		],
	},

	// TypeScript / TSX files
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsParser ?? undefined,
			parserOptions: tsParser
				? {
						// Prefer typed rules if available; otherwise untyped mode
						project: './tsconfig.json',
						tsconfigRootDir: process.cwd(),
						ecmaFeatures: { jsx: true },
					}
				: { ecmaFeatures: { jsx: true } },
		},
		plugins: Object.fromEntries(
			Object.entries({
				'@next/next': nextPlugin,
				'@typescript-eslint': tsPlugin,
				react: reactPlugin,
				'react-hooks': reactHooksPlugin,
				import: importPlugin,
				'jsx-a11y': jsxA11yPlugin,
			}).filter(([, v]) => !!v)
		),
		rules: {
			...coreRules,
			...nextRules,
			...reactRules,
			...hooksRules,
			...tsRules,
			...importRules,
			// A11y baseline (if plugin present, use its recommended preset)
			...(jsxA11yPlugin?.configs?.recommended?.rules ?? {}),
		},
	},

	// JavaScript config / scripts
	{
		files: ['**/*.{js,cjs,mjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: Object.fromEntries(
			Object.entries({
				'@next/next': nextPlugin,
				react: reactPlugin,
				'react-hooks': reactHooksPlugin,
				import: importPlugin,
			}).filter(([, v]) => !!v)
		),
		rules: {
			...coreRules,
			...nextRules,
			...reactRules,
			...hooksRules,
			...importRules,
		},
		env: { node: true },
	},

	// Overrides: Next App Router pages/layout/error/not-found default export allowance
	importPlugin && {
		files: ['app/**/page.tsx', 'app/layout.tsx', 'app/**/not-found.tsx'],
		rules: { 'import/no-default-export': 'off' },
	},

	// Test files: relax some TS rules
	tsPlugin && {
		files: ['**/*.test.ts', '**/*.test.tsx'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
].filter(Boolean);

// Note: If eslint-config-prettier is installed, add it as the last item in this array to disable
// conflicting stylistic rules in flat config form. Not added here to avoid new deps.
