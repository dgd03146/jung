import type {
	DraftPost,
	PostWithBlockContent,
} from '@/fsd/entities/post/model/post';
import { useGetPost } from '@/fsd/features/blog/api';
import {
	EMPTY_CONTENT,
	EMPTY_POST,
	STORAGE_KEY,
} from '@/fsd/features/blog/config';
import { confirmLoadDraft, validatePostData } from '@/fsd/features/blog/lib';
import { storage } from '@/fsd/shared';
import { useMatch } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

import type { Errors } from '../types/errors';

export const usePostState = () => {
	const editMatch = useMatch({
		from: '/blog/edit/$postId',
		shouldThrow: false,
	});

	const isEditPage = !!editMatch;
	const postId = isEditPage ? editMatch.params.postId : undefined;

	const {
		data: fetchedPost,
		isLoading,
		error: fetchError,
		refetch,
	} = useGetPost(postId);

	const [localPost, setLocalPost] = useState<PostWithBlockContent>(() => {
		const savedPost: DraftPost | null = storage.get(STORAGE_KEY);
		if (savedPost && confirmLoadDraft(savedPost.lastSaved)) {
			const content =
				savedPost.content.length > 0 ? savedPost.content : [EMPTY_CONTENT];
			return { ...savedPost, content };
		}
		storage.remove(STORAGE_KEY);
		return EMPTY_POST;
	});

	useEffect(() => {
		if (fetchedPost) setLocalPost(fetchedPost);
	}, [fetchedPost]);

	const [validateErrors, setValidateErrors] = useState<Errors>(() => {
		if (isEditPage) {
			return { imagesrc: '', category: '', title: '', description: '' };
		}
		return validatePostData(localPost);
	});

	const validateAndUpdateErrors = useCallback((data: PostWithBlockContent) => {
		const newErrors = validatePostData(data);
		setValidateErrors(newErrors);
		return newErrors;
	}, []);

	const updatePostData = useCallback(
		<K extends keyof PostWithBlockContent>(
			field: K,
			value: PostWithBlockContent[K],
		) => {
			setLocalPost((prev) => {
				const newPostData = { ...prev, [field]: value };

				validateAndUpdateErrors(newPostData);
				return newPostData;
			});
		},
		[validateAndUpdateErrors],
	);

	const resetForm = useCallback(() => {
		EMPTY_POST;
		setValidateErrors(validatePostData(EMPTY_POST));
		storage.remove(STORAGE_KEY);
	}, []);

	return {
		localPost,
		fetchedPost,
		validateErrors,
		setLocalPost,
		updatePostData,
		resetForm,
		isLoading,
		fetchError,
		validateAndUpdateErrors,
		refetch,
	};
};
