import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useCallback } from 'react';

import { uploadImage } from '../api/uploadImage';
import { isNonEmptyBlock } from '../lib/isEmpty';

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
