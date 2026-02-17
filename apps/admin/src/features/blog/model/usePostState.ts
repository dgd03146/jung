import { useQuery } from '@tanstack/react-query';
import { useMatch } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
	DraftPost,
	PostWithBlockContent,
} from '@/fsd/entities/post/model/post';
import { postQueryOptions } from '@/fsd/features/blog/api/postQueryOptions';
import { EMPTY_POST, STORAGE_KEY } from '@/fsd/features/blog/config';
import { EMPTY_CONTENT, storage, useConfirmDialog } from '@/fsd/shared';

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
	} = useQuery(postQueryOptions.detail(String(postId)));

	const { confirm } = useConfirmDialog();
	const draftChecked = useRef(false);

	const [localPost, setLocalPost] = useState<DraftPost>(EMPTY_POST);

	useEffect(() => {
		if (draftChecked.current) return;
		if (isEditPage || fetchedPost) return;
		draftChecked.current = true;

		const savedPost: DraftPost | null = storage.get(STORAGE_KEY);
		if (!savedPost?.lastSaved) {
			storage.remove(STORAGE_KEY);
			return;
		}

		confirm({
			title: 'Load Draft',
			description: `There is a saved draft from ${savedPost.lastSaved}. Would you like to load it?`,
			confirmText: 'Load',
			cancelText: 'Discard',
		}).then((ok) => {
			if (ok) {
				const content =
					savedPost.content.length > 0 ? savedPost.content : [EMPTY_CONTENT];
				setLocalPost({ ...savedPost, content });
			} else {
				storage.remove(STORAGE_KEY);
			}
		});
	}, [confirm, isEditPage, fetchedPost]);

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
