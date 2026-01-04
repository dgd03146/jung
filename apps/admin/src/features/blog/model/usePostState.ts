import { useMatch } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
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
import { confirmLoadDraft } from '@/fsd/features/blog/lib';
import { storage } from '@/fsd/shared';

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

	const [localPost, setLocalPost] = useState<DraftPost>(() => {
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

	const updatePostData = useCallback(
		<K extends keyof PostWithBlockContent>(
			field: K,
			value: PostWithBlockContent[K],
		) => {
			setLocalPost((prev) => ({
				...prev,
				[field]: value,
			}));
		},
		[],
	);

	const resetForm = useCallback(() => {
		setLocalPost(EMPTY_POST);
		storage.remove(STORAGE_KEY);
	}, []);

	return {
		localPost,
		fetchedPost,
		setLocalPost,
		updatePostData,
		resetForm,
		isLoading,
		fetchError,
		refetch,
	};
};
