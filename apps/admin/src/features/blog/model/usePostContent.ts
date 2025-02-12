import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useCallback } from 'react';

import { uploadImage } from '@/fsd/features/blog/api';
import { isNonEmptyBlock } from '@/fsd/features/blog/lib';

export const usePostContent = (initialContent: PartialBlock[]) => {
	const editor = useCreateBlockNote({
		initialContent,
		uploadFile: uploadImage,
	});

	const getContent = useCallback(() => {
		return editor.document.filter(isNonEmptyBlock);
	}, [editor.document]);

	return { editor, getContent };
};
