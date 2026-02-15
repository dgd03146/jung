import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useEffect } from 'react';

import { EMPTY_CONTENT } from '@/fsd/shared';
import { uploadImage } from '../api';

export const useArticleContent = (initialContent: PartialBlock[]) => {
	const editor = useCreateBlockNote({
		initialContent: [EMPTY_CONTENT],
		uploadFile: uploadImage,
	});

	useEffect(() => {
		const isEmptyDefault =
			initialContent.length === 1 && initialContent[0] === EMPTY_CONTENT;
		if (initialContent.length > 0 && !isEmptyDefault) {
			editor.replaceBlocks(editor.document, initialContent);
		}
	}, [editor, initialContent]);

	const getContent = () => editor.document;

	return { editor, getContent };
};
