interface KakaoShareContent {
	title: string;
	description?: string;
	imageUrl?: string;
	link: {
		mobileWebUrl: string;
		webUrl: string;
	};
}

interface KakaoShareButton {
	title: string;
	link: {
		mobileWebUrl: string;
		webUrl: string;
	};
}

interface KakaoShareDefaultParams {
	objectType: 'feed';
	content: KakaoShareContent;
	buttons?: KakaoShareButton[];
}

interface KakaoShare {
	sendDefault(params: KakaoShareDefaultParams): void;
}

interface KakaoStatic {
	init(appKey: string): void;
	isInitialized(): boolean;
	Share: KakaoShare;
}

declare global {
	interface Window {
		Kakao?: KakaoStatic;
	}
}

export {};
