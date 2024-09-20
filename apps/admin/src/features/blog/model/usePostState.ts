import { storage } from '@/fsd/shared';
import { useCallback, useState } from 'react';
import { defaultBlock, initialPostData } from '../config/initialPost';
import { STORAGE_KEY } from '../config/storageKey';
import { confirmLoadDraft } from '../lib/confirmLoadDraft';
import { validatePostData } from '../lib/validatePostData';
import type { Errors } from '../types/errors';
import type { PostData } from '../types/postData';

export const usePostState = () => {
	const [postData, setPostData] = useState<PostData>(() => {
		const savedPost = storage.get(STORAGE_KEY) as PostData | null;
		if (savedPost && confirmLoadDraft(savedPost.lastSaved)) {
			const content =
				savedPost.content.length > 0 ? savedPost.content : [defaultBlock];

			return {
				...savedPost,
				content,
			};
		}
		storage.remove(STORAGE_KEY);
		return initialPostData;
	});

	const [errors, setErrors] = useState<Errors>(() =>
		validatePostData(postData),
	);

	const validateAndUpdateErrors = useCallback((data: PostData) => {
		const newErrors = validatePostData(data);
		setErrors(newErrors);
		return newErrors;
	}, []);

	const updatePostData = useCallback(
		<K extends keyof PostData>(field: K, value: PostData[K]) => {
			setPostData((prev) => {
				const newPostData = { ...prev, [field]: value };
				validateAndUpdateErrors(newPostData);
				return newPostData;
			});
		},
		[validateAndUpdateErrors],
	);

	const resetForm = useCallback(() => {
		setPostData(initialPostData);
		setErrors(validatePostData(initialPostData));
	}, []);

	return {
		postData,
		errors,
		setPostData,
		updatePostData,
		resetForm,
	};
};
