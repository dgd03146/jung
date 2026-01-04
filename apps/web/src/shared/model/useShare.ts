'use client';

import { useToast } from '@jung/design-system/components';
import { useState } from 'react';

type SharePlatform = 'kakao' | 'x' | 'linkedin' | 'whatsapp';

export interface ShareContent {
	title: string;
	description?: string;
	imageUrl?: string;
	url: string;
}

interface UseShareOptions {
	showToastOnError?: boolean;
}

export const useShare = (options: UseShareOptions = {}) => {
	const { showToastOnError = true } = options;
	const showToast = useToast();
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [selectedContent, setSelectedContent] = useState<ShareContent | null>(
		null,
	);

	const createShareUrl = (content: ShareContent) => {
		const url = encodeURIComponent(content.url);
		const text = encodeURIComponent(content.title);
		return { url, text };
	};

	const getShareLinks = (content: ShareContent) => {
		const { url, text } = createShareUrl(content);

		const handleKakaoShare = async () => {
			try {
				if (typeof window === 'undefined') return;

				if (!window.Kakao) {
					if (showToastOnError) {
						showToast('카카오톡 SDK를 불러오는 중입니다', 'error');
					}
					return;
				}

				if (!window.Kakao.isInitialized()) {
					window.Kakao.init(
						process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string,
					);
				}

				const shareOptions = {
					objectType: 'feed',
					content: {
						title: content.title,
						description: content.description || '',
						imageUrl: content.imageUrl || '',
						link: {
							mobileWebUrl: content.url,
							webUrl: content.url,
						},
					},
				} as const;

				window.Kakao.Link.sendDefault(shareOptions);
			} catch (error) {
				console.error('Kakao share error:', error);
				if (showToastOnError) {
					showToast('카카오톡 공유 중 오류가 발생했습니다', 'error');
				}
			}
		};

		return {
			kakao: handleKakaoShare,
			x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
			whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
		} satisfies Record<SharePlatform, string | (() => Promise<void>)>;
	};

	const handleShare = async (content: ShareContent) => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: content.title,
					text: content.description || '',
					url: content.url,
				});
				return;
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				if (showToastOnError) {
					showToast('공유하기 중 오류가 발생했습니다', 'error');
				}
			}
		}

		setSelectedContent(content);
		setIsShareModalOpen(true);
	};

	const closeShareModal = () => {
		setIsShareModalOpen(false);
		setSelectedContent(null);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedContent,
		closeShareModal,
		getShareLinks,
	} as const;
};
