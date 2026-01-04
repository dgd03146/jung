import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useCallback, useEffect } from 'react';

import { uploadImage } from '@/fsd/features/blog/api';
import { createHighlighter } from '@/fsd/shared/lib/shiki.bundle';
import { EMPTY_CONTENT } from '../config';

export const usePostContent = (initialContent: PartialBlock[]) => {
	const editor = useCreateBlockNote({
		initialContent: [EMPTY_CONTENT],
		uploadFile: uploadImage,
		codeBlock: {
			defaultLanguage: 'tsx',
			supportedLanguages: {
				javascript: {
					name: 'JavaScript',
					aliases: ['js'],
				},
				typescript: {
					name: 'TypeScript',
					aliases: ['ts'],
				},
				html: {
					name: 'Html',
				},
				css: {
					name: 'Css',
				},
				json: {
					name: 'Json',
				},
				jsx: {
					name: 'Jsx',
				},
				tsx: {
					name: 'Tsx',
				},
				markdown: {
					name: 'Markdown',
					aliases: ['md'],
				},
			},
			createHighlighter: () =>
				createHighlighter({
					themes: ['one-light'],
					langs: [
						'javascript',
						'typescript',
						'html',
						'css',
						'json',
						'markdown',
						'jsx',
						'tsx',
					],
				}),
		},
	});

	useEffect(() => {
		if (initialContent && initialContent.length > 0) {
			editor.replaceBlocks(editor.document, initialContent);
		}
	}, [editor, initialContent]);

	const getContent = useCallback(() => {
		return editor.document;
	}, [editor.document]);

	return { editor, getContent };
};
