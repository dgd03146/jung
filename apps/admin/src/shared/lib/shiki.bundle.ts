import {
	createdBundledHighlighter,
	createSingletonShorthands,
} from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
/* Generate by @shikijs/codegen */
import type {
	DynamicImportLanguageRegistration,
	DynamicImportThemeRegistration,
	HighlighterGeneric,
} from '@shikijs/types';

type BundledLanguage =
	| 'javascript'
	| 'js'
	| 'typescript'
	| 'ts'
	| 'html'
	| 'css'
	| 'json'
	| 'markdown'
	| 'md'
	| 'jsx' // Added JSX
	| 'tsx'; // Added TSX
type BundledTheme = 'light-plus' | 'dark-plus';
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

const bundledLanguages = {
	javascript: () => import('@shikijs/langs-precompiled/javascript'),
	typescript: () => import('@shikijs/langs-precompiled/typescript'),
	html: () => import('@shikijs/langs-precompiled/html'),
	css: () => import('@shikijs/langs-precompiled/css'),
	json: () => import('@shikijs/langs-precompiled/json'),
	markdown: () => import('@shikijs/langs-precompiled/markdown'),
	jsx: () => import('@shikijs/langs-precompiled/jsx'), // Added JSX import
	tsx: () => import('@shikijs/langs-precompiled/tsx'), // Added TSX import
} as Record<BundledLanguage, DynamicImportLanguageRegistration>;

const bundledThemes = {
	'light-plus': () => import('@shikijs/themes/light-plus'),
	'dark-plus': () => import('@shikijs/themes/dark-plus'),
} as Record<BundledTheme, DynamicImportThemeRegistration>;

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<
	BundledLanguage,
	BundledTheme
>({
	langs: bundledLanguages,
	themes: bundledThemes,
	engine: () => createJavaScriptRegexEngine(),
});

const {
	codeToHtml,
	codeToHast,
	codeToTokensBase,
	codeToTokens,
	codeToTokensWithThemes,
	getSingletonHighlighter,
	getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
	createHighlighter,
);

export {
	bundledLanguages,
	bundledThemes,
	codeToHast,
	codeToHtml,
	codeToTokens,
	codeToTokensBase,
	codeToTokensWithThemes,
	createHighlighter,
	getLastGrammarState,
	getSingletonHighlighter,
};
export type { BundledLanguage, BundledTheme, Highlighter };
