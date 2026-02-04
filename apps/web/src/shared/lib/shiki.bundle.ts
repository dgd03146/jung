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
	| 'typescript'
	| 'html'
	| 'css'
	| 'json'
	| 'markdown'
	| 'md'
	| 'jsx'
	| 'tsx';
type BundledTheme = 'light-plus' | 'dark-plus';
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

const bundledLanguages = {
	javascript: () => import('@shikijs/langs-precompiled/javascript'),

	typescript: () => import('@shikijs/langs-precompiled/typescript'),

	html: () => import('@shikijs/langs-precompiled/html'),
	css: () => import('@shikijs/langs-precompiled/css'),
	json: () => import('@shikijs/langs-precompiled/json'),
	markdown: () => import('@shikijs/langs-precompiled/markdown'),
	jsx: () => import('@shikijs/langs-precompiled/jsx'),
	tsx: () => import('@shikijs/langs-precompiled/tsx'),
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

const shorthands = /* @__PURE__ */ createSingletonShorthands<
	BundledLanguage,
	BundledTheme
>(createHighlighter);

const codeToHtml = shorthands.codeToHtml;
const codeToHast: typeof shorthands.codeToHast = shorthands.codeToHast;
const codeToTokensBase = shorthands.codeToTokensBase;
const codeToTokens = shorthands.codeToTokens;
const codeToTokensWithThemes = shorthands.codeToTokensWithThemes;
const getSingletonHighlighter = shorthands.getSingletonHighlighter;
const getLastGrammarState: typeof shorthands.getLastGrammarState =
	shorthands.getLastGrammarState;

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
