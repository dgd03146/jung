'use client';
import { useToast } from '@jung/design-system/components';
import { useState } from 'react';

// 공유 플랫폼 타입 정의
type SharePlatform = 'kakao' | 'x' | 'linkedin' | 'whatsapp';

export interface ShareOptions {
	title: string;
	description?: string;
	imageUrl?: string;
	link: {
		mobileWebUrl: string;
		webUrl: string;
	};
}

// FIXME: 공용 훅으로 빼기, useSharePhoto와 통합
export const useSharePlace = () => {
	const showToast = useToast();
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState<ShareOptions | null>(null);

	const createShareUrl = (place: ShareOptions) => {
		const url = encodeURIComponent(place.link.mobileWebUrl);
		const text = encodeURIComponent(place.title || 'Shared Content');
		return { url, text };
	};

	const getShareLinks = (place: ShareOptions) => {
		const { url, text } = createShareUrl(place);

		const handleKakaoShare = async () => {
			try {
				if (typeof window === 'undefined') return;

				if (!window.Kakao) {
					showToast('카카오톡 SDK를 불러오는 중입니다', 'error');
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
						title: place.title || 'Shared Content',
						description: place.description || '',
						imageUrl: place.imageUrl || '',
						link: {
							mobileWebUrl: place.link.mobileWebUrl,
							webUrl: place.link.webUrl,
						},
					},
				} as const;

				window.Kakao.Link.sendDefault(shareOptions);
			} catch (error) {
				console.error('Kakao share error:', error);
				showToast('카카오톡 공유 중 오류가 발생했습니다', 'error');
			}
		};
		return {
			kakao: handleKakaoShare,
			x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
			whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
		} satisfies Record<SharePlatform, string | (() => Promise<void>)>;
	};

	const handleShare = async (place: ShareOptions) => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: place.title || 'Shared Content',
					text: place.description || '',
					url: place.link.mobileWebUrl,
				});
				return;
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				showToast('공유하기 중 오류가 발생했습니다', 'error');
			}
		}

		setSelectedPlace(place);
		setIsShareModalOpen(true);
	};

	const closeShareModal = () => {
		setIsShareModalOpen(false);
		setSelectedPlace(null);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedPlace,
		closeShareModal,
		getShareLinks,
	} as const;
};
