'use client';

import { type ShareContent, useShare } from '@/fsd/shared';

export interface SharePlaceOptions {
	title: string;
	description?: string;
	imageUrl?: string;
	link: {
		mobileWebUrl: string;
		webUrl: string;
	};
}

export const useSharePlace = () => {
	const {
		handleShare: baseHandleShare,
		isShareModalOpen,
		setIsShareModalOpen,
		selectedContent,
		closeShareModal,
		getShareLinks: baseGetShareLinks,
	} = useShare({ showToastOnError: true });

	const handleShare = (place: SharePlaceOptions) => {
		const content: ShareContent = {
			title: place.title,
			description: place.description,
			imageUrl: place.imageUrl,
			url: place.link.mobileWebUrl,
		};
		return baseHandleShare(content);
	};

	const getShareLinks = (place: SharePlaceOptions) => {
		const content: ShareContent = {
			title: place.title,
			description: place.description,
			imageUrl: place.imageUrl,
			url: place.link.mobileWebUrl,
		};
		return baseGetShareLinks(content);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedPlace: selectedContent,
		closeShareModal,
		getShareLinks,
	} as const;
};
