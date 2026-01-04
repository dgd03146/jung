'use client';

import type { Photo } from '@jung/shared/types';
import { type ShareContent, useShare } from '@/fsd/shared';

export const useSharePhoto = () => {
	const {
		handleShare: baseHandleShare,
		isShareModalOpen,
		setIsShareModalOpen,
		selectedContent,
		closeShareModal,
		getShareLinks: baseGetShareLinks,
	} = useShare({ showToastOnError: false });

	const handleShare = (photo: Photo) => {
		const content: ShareContent = {
			title: photo.title || 'Shared Content',
			description: photo.description || '',
			imageUrl: photo.image_url || '',
			url: typeof window !== 'undefined' ? window.location.href : '',
		};
		return baseHandleShare(content);
	};

	const getShareLinks = (photo: Photo) => {
		const content: ShareContent = {
			title: photo.title || 'Shared Content',
			description: photo.description || '',
			imageUrl: photo.image_url || '',
			url: typeof window !== 'undefined' ? window.location.href : '',
		};
		return baseGetShareLinks(content);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedPhoto: selectedContent,
		closeShareModal,
		getShareLinks,
	} as const;
};
