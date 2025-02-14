import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useCallback, useEffect } from 'react';

import { uploadImage } from '@/fsd/features/blog/api';
import { EMPTY_CONTENT } from '../config';

export const usePostContent = (initialContent: PartialBlock[]) => {
	const editor = useCreateBlockNote({
		initialContent: [EMPTY_CONTENT],
		uploadFile: uploadImage,
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
