import { useToast } from '@jung/design-system';
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
export const useShareSpot = () => {
	const showToast = useToast();
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [selectedSpot, setSelectedSpot] = useState<ShareOptions | null>(null);

	const createShareUrl = (spot: ShareOptions) => {
		const url = encodeURIComponent(spot.link.mobileWebUrl);
		const text = encodeURIComponent(spot.title || 'Shared Content');
		return { url, text };
	};

	const getShareLinks = (spot: ShareOptions) => {
		const { url, text } = createShareUrl(spot);

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
						title: spot.title || 'Shared Content',
						description: spot.description || '',
						imageUrl: spot.imageUrl || '',
						link: {
							mobileWebUrl: spot.link.mobileWebUrl,
							webUrl: spot.link.webUrl,
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

	const handleShare = async (spot: ShareOptions) => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: spot.title || 'Shared Content',
					text: spot.description || '',
					url: spot.link.mobileWebUrl,
				});
				return;
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				showToast('공유하기 중 오류가 발생했습니다', 'error');
			}
		}

		setSelectedSpot(spot);
		setIsShareModalOpen(true);
	};

	const closeShareModal = () => {
		setIsShareModalOpen(false);
		setSelectedSpot(null);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedSpot,
		closeShareModal,
		getShareLinks,
	} as const;
};
