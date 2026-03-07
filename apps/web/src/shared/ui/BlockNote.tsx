'use client';

import { codeBlockOptions } from '@blocknote/code-block';
import {
	BlockNoteSchema,
	createCodeBlockSpec,
	defaultBlockSpecs,
	type PartialBlock,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect } from 'react';
import type { HeadingItem } from '../lib/extractHeadings';
import './BlockNote.css';

const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs,
		codeBlock: createCodeBlockSpec({
			...codeBlockOptions,
			createHighlighter: async () => {
				const highlighter = await codeBlockOptions.createHighlighter?.();
				if (!highlighter) {
					throw new Error('Failed to create code block highlighter');
				}
				// prosemirror-highlight uses the first loaded theme as default.
				// codeBlockOptions bundles themes as [github-dark, github-light],
				// so we reorder to make github-light the default for light mode.
				const themes = highlighter.getLoadedThemes();
				if (themes[0] !== 'github-light') {
					const reordered = [
						'github-light',
						...themes.filter((t: string) => t !== 'github-light'),
					];
					Object.defineProperty(highlighter, 'getLoadedThemes', {
						value: () => reordered,
					});
				}
				return highlighter;
			},
		}),
	},
});

type Props = {
	initialContent: PartialBlock[];
	headings?: HeadingItem[];
};

export const BlockNote = ({ initialContent, headings = [] }: Props) => {
	useEffect(() => {
		if (headings.length === 0) return;

		const timer = setTimeout(() => {
			const headingElements = document.querySelectorAll(
				'.bn-block-content[data-content-type="heading"]',
			);

			headingElements.forEach((el, index) => {
				if (headings[index]) {
					el.id = headings[index].id;
				}
			});
		}, 100);

		return () => clearTimeout(timer);
	}, [headings]);

	const editor = useCreateBlockNote({
		schema,
		initialContent,
	});

	return <BlockNoteView editor={editor} editable={false} theme='light' />;
};
