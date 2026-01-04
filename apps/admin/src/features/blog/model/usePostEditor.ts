import { useToast } from '@jung/design-system/components';
import { useCallback, useState } from 'react';
import type { PostWithBlockContent } from '@/fsd/entities';

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
import { storage, useThrottle } from '@/fsd/shared';
import type { Errors } from '../types/errors';

export const usePostEditor = () => {
	const {
		localPost,
		fetchedPost,
		updatePostData,
		resetForm,
		isLoading,
		fetchError,
		refetch,
	} = usePostState();

	const [formErrors, setFormErrors] = useState<Errors | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const { editor, getContent } = usePostContent(localPost.content);
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
			} catch (_error: unknown) {
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
			setFormErrors(null);
		} else {
			showToast('Cannot save an empty post.');
		}
	}, [getContent, localPost, showToast]);

	const throttledSave = useThrottle(handleSave, 3000);
	useKeyboardShortcut('s', throttledSave);

	const validateForm = useCallback(
		(data: PostWithBlockContent): Errors | null => {
			const errors: Errors = {
				title: !data.title.trim() ? 'Enter a title' : '',
				description: !data.description.trim() ? 'Enter a description' : '',
				category_id: !data.category_id ? 'Select a category' : '',
				imagesrc: !data.imagesrc ? 'Upload a featured image' : '',
				date: !data.date ? 'Select a date' : '',
			};

			return Object.values(errors).some(Boolean) ? errors : null;
		},
		[],
	);

	const preparePostData = useCallback(
		async (imageFile: File | null) => {
			const errors = validateForm(localPost);
			if (errors) {
				setFormErrors(errors);
				showToast('Please fill in all required fields', 'error');
				return null;
			}

			let imagesrc = localPost.imagesrc;
			if (imageFile) {
				imagesrc = (await handleImageUpload(imageFile)) || '';
			}

			const content = getContent();
			const serializedContent = serializeContent(content);

			const { id, lastSaved, ...post } = localPost;

			return {
				...post,
				content: serializedContent,
				imagesrc,
			};
		},
		[localPost, handleImageUpload, getContent, showToast, validateForm],
	);

	const handleCreate = useCallback(
		async (imageFile: File | null) => {
			const postData = await preparePostData(imageFile);
			if (!postData) return;

			createPostMutation.mutate(postData);

			storage.remove(STORAGE_KEY);
			setFormErrors(null);
		},
		[preparePostData, createPostMutation],
	);

	const handleUpdate = useCallback(
		async (imageFile: File | null) => {
			const postData = await preparePostData(imageFile);
			if (!postData) return;

			updatePostMutation.mutate({
				id: localPost.id,
				post: {
					...postData,
					updated_at: localPost.date || new Date().toISOString(),
				},
			});
			storage.remove(STORAGE_KEY);
			setFormErrors(null);
		},
		[preparePostData, updatePostMutation, localPost.id, localPost.date],
	);

	const handleDiscard = useCallback(() => {
		if (window.confirm('Are you sure you want to discard this draft?')) {
			resetForm();
			editor.replaceBlocks(editor.document, EMPTY_POST.content);
			setFormErrors(null);
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

	return {
		localPost,
		editor,
		formErrors,
		isLoading,
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
