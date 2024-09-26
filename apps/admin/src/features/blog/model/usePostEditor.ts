import { storage, useThrottle } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useCallback, useEffect, useState } from 'react';

import {
	uploadImage,
	useCreatePost,
	useKeyboardShortcut,
	usePostContent,
	usePostState,
	useUpdatePost,
} from '@/fsd/features/blog/api';

import { EMPTY_POST, STORAGE_KEY } from '@/fsd/features/blog/config';
import { isPostEmpty, serializeContent } from '@/fsd/features/blog/lib';

export const usePostEditor = () => {
	const {
		localPost,
		fetchedPost,
		isLoading,
		fetchError,
		validateErrors,
		updatePostData,
		resetForm,
		refetch,
	} = usePostState();

	const { editor, getContent } = usePostContent(localPost.content);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const showToast = useToast();
	const createPostMutation = useCreatePost();
	const updatePostMutation = useUpdatePost();

	const isCreating = createPostMutation.isPending;
	const isUpdating = updatePostMutation.isPending;

	const handleImageUpload = useCallback(
		async (file: File | null) => {
			if (!file) return;

			try {
				const publicUrl = await uploadImage(file);
				return publicUrl;
			} catch (error: unknown) {
				showToast('Failed to upload Image');
			}
		},
		[showToast],
	);

	const handleSave = useCallback(() => {
		const content = getContent();
		const postToSave = {
			...localPost,
			content,
			lastSaved: new Date().toLocaleString(),
		};

		if (!isPostEmpty(postToSave)) {
			storage.set(STORAGE_KEY, postToSave);
			showToast('Post saved successfully!');
		} else {
			showToast('Cannot save an empty post.');
		}
	}, [getContent, localPost, showToast]);

	const throttledSave = useThrottle(handleSave, 3000);
	useKeyboardShortcut('s', throttledSave);

	const preparePostData = useCallback(
		async (imageFile: File | null) => {
			const errorMessages = Object.values(validateErrors).filter(Boolean);
			if (errorMessages.length !== 0) {
				showToast('Please fill all required fields');
				return null;
			}

			let imagesrc = localPost.imagesrc;
			if (imageFile) {
				imagesrc = (await handleImageUpload(imageFile)) || '';
			}

			const content = getContent();
			const serializedContent = serializeContent(content);

			const { id, ...post } = localPost;

			return {
				...post,
				content: serializedContent,
				imagesrc,
			};
		},
		[validateErrors, showToast, handleImageUpload, getContent, localPost],
	);

	const handleCreate = useCallback(
		async (imageFile: File | null) => {
			const postData = await preparePostData(imageFile);
			if (!postData) return;

			const updatedPostData = {
				...postData,
				date: new Date().toISOString(),
			};

			createPostMutation.mutate(updatedPostData);
			storage.remove(STORAGE_KEY);
		},
		[preparePostData, createPostMutation],
	);

	const handleUpdate = useCallback(
		async (imageFile: File | null) => {
			const postData = await preparePostData(imageFile);
			if (!postData) return;

			const updatedPostData = {
				...postData,
				updated_at: new Date().toISOString(),
			};

			updatePostMutation.mutate({ id: localPost.id, post: updatedPostData });
			storage.remove(STORAGE_KEY);
		},
		[preparePostData, updatePostMutation, localPost.id],
	);

	const handleDiscard = useCallback(() => {
		if (window.confirm('Are you sure you want to discard this draft?')) {
			resetForm();
			editor.replaceBlocks(editor.document, EMPTY_POST.content);
			showToast('Draft discarded');
		}
	}, [editor, resetForm, showToast]);

	const handleSubmit = useCallback(() => {
		if (fetchedPost) {
			handleUpdate(imageFile);
		} else {
			handleCreate(imageFile);
		}
	}, [fetchedPost, handleUpdate, handleCreate, imageFile]);

	useEffect(() => {
		if (fetchedPost) editor.replaceBlocks(editor.document, fetchedPost.content);
	}, [fetchedPost, editor]);

	return {
		localPost,
		editor,
		isLoading,
		validateErrors,
		fetchError,
		handleSave,
		handleDiscard,
		handleFieldChange: updatePostData,
		handleSubmit,

		isSubmitting: isCreating || isUpdating,
		setImageFile,
		refetch,
		fetchedPost,
	};
};
