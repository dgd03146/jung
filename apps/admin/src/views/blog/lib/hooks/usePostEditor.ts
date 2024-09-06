import { useCreateBlockNote } from '@blocknote/react';
import { useToast } from '@jung/design-system/components';
import { useCallback, useState } from 'react';

import { initialPostData } from '../../consts/initialPost';
import type { PostData } from '../types/post';
import { isNonEmptyBlock, isPostEmpty } from '../utils/isEmpty';
import storage from '../utils/localStorage';
import { useKeyboardShortcut } from './useKeyboardShortcut';
import { useThrottle } from './useThrottle';

const STORAGE_KEY = 'draftPost';

export const usePostEditor = () => {
	const [postData, setPostData] = useState<PostData>(() => {
		const savedPost = storage.get(STORAGE_KEY) as PostData | null;
		if (savedPost) {
			const confirmMessage = savedPost.lastSaved
				? `There is a saved draft from ${savedPost.lastSaved}. Would you like to load it?`
				: 'There is a saved draft. Would you like to load it?';
			if (window.confirm(confirmMessage)) {
				return savedPost;
			}
			storage.remove(STORAGE_KEY);
		}
		return initialPostData;
	});

	const showToast = useToast();

	const editor = useCreateBlockNote({
		initialContent: postData.content,
	});

	const handleSave = useCallback(() => {
		const contentToSave = editor.document.filter(isNonEmptyBlock);
		const postToSave = {
			...postData,
			content: contentToSave,
			lastSaved: new Date().toLocaleString(),
		};

		if (isPostEmpty(postToSave)) {
			showToast('Nothing to save. The post is empty.');
		} else {
			storage.set(STORAGE_KEY, postToSave);
			showToast('Post saved successfully!');
		}
	}, [postData, editor.document, showToast]);

	const throttledSave = useThrottle(handleSave, 3000);
	useKeyboardShortcut('s', throttledSave);

	const handleDiscard = useCallback(() => {
		if (window.confirm('Are you sure you want to discard this draft?')) {
			storage.remove(STORAGE_KEY);
			setPostData(initialPostData);
			editor.replaceBlocks(editor.document, initialPostData.content);
			showToast('Draft discarded');
		}
	}, [editor, showToast]);

	const handleTitleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPostData((prev) => ({ ...prev, title: e.target.value }));
		},
		[],
	);

	const handleTagsChange = useCallback((newTags: string[]) => {
		setPostData((prev) => ({ ...prev, tags: newTags }));
	}, []);

	const handleImageUpload = useCallback((file: File) => {
		setPostData((prev) => ({ ...prev, imagesrc: file.name }));
	}, []);

	return {
		postData,
		editor,
		handleSave,
		handleDiscard,
		handleTitleChange,
		handleTagsChange,
		handleImageUpload,
		throttledSave,
	};
};
