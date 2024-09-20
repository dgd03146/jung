import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { useCallback } from 'react';
import { isNonEmptyBlock } from '../lib/isEmpty';
import type { UploadResult } from './useFileUpload';

export const usePostContent = (
	initialContent: PartialBlock[],
	uploadFile: (file: File) => Promise<UploadResult>,
) => {
	const editor = useCreateBlockNote({
		initialContent,
		uploadFile,
	});

	const getContent = useCallback(() => {
		return editor.document.filter(isNonEmptyBlock);
	}, [editor]);

	return { editor, getContent };
};
