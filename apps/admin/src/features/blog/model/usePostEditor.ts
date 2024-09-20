import { storage, useThrottle } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useCallback, useState } from 'react';
import { STORAGE_KEY } from '../config/storageKey';
import { isPostEmpty } from '../lib/isEmpty';
import { useCreatePost } from './useCreatePost';
import { useFileUpload } from './useFileUpload';
import { useKeyboardShortcut } from './useKeyboardShortcut';
import { usePostContent } from './usePostContent';
import { usePostState } from './usePostState';

export const usePostEditor = () => {
	const { postData, errors, updatePostData, resetForm } = usePostState();
	const showToast = useToast();
	const createPostMutation = useCreatePost();
	const { uploadFile } = useFileUpload();
	const { editor, getContent } = usePostContent(postData.content, uploadFile);
	const [isUploading, setIsUploading] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleSave = useCallback(() => {
		const content = getContent();
		const postToSave = {
			...postData,
			content,
			lastSaved: new Date().toLocaleString(),
		};

		if (isPostEmpty(postToSave)) {
			showToast('Nothing to save. The post is empty.');
		} else {
			storage.set(STORAGE_KEY, postToSave);
			showToast('Post saved successfully!');
		}
	}, [getContent, postData, showToast]);

	const throttledSave = useThrottle(handleSave, 3000);
	useKeyboardShortcut('s', throttledSave);

	const handleDiscard = useCallback(() => {
		if (window.confirm('Are you sure you want to discard this draft?')) {
			storage.remove(STORAGE_KEY);
			resetForm();
			editor.replaceBlocks(editor.document, postData.content);
			showToast('Draft discarded');
		}
	}, [editor, resetForm, postData.content, showToast]);

	const handleImageUpload = useCallback(
		async (file: File | null) => {
			if (!file) {
				updatePostData('imagesrc', '');
				return;
			}

			setIsUploading(true);

			// Upload image to supabase
			const { shortId } = await uploadFile(file);
			// Save short imageId to supabse
			updatePostData('imagesrc', shortId);

			return shortId;
		},
		[uploadFile, updatePostData],
	);

	const handleCreate = useCallback(async () => {
		const errorMessages = Object.values(errors).filter(Boolean);
		if (errorMessages.length !== 0) {
			showToast('Please fill all required fields');
			return;
		}

		let updatedPostData = { ...postData };

		if (imageFile) {
			const imageId = await handleImageUpload(imageFile);
			updatedPostData = {
				...updatedPostData,
				imagesrc: imageId || '',
			};
		}

		createPostMutation.mutate(updatedPostData);
		storage.remove(STORAGE_KEY);
	}, [
		errors,
		createPostMutation,
		postData,
		showToast,
		handleImageUpload,
		imageFile,
	]);

	// TODO: 렌더링 최적화 할 수 있으면 해보기!
	return {
		post: postData,
		editor,
		errors,
		handleSave,
		handleDiscard,
		handleFieldChange: updatePostData,
		handleImageUpload,
		throttledSave,
		handleCreate,
		isCreating: createPostMutation.isPending,
		isUploading,
		setImageFile,
	};
};
