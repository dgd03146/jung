interface KakaoShareLink {
	mobileWebUrl: string;
	webUrl: string;
}

interface KakaoShareContent {
	title: string;
	description?: string;
	imageUrl?: string;
	link: KakaoShareLink;
}

interface KakaoShareButton {
	title: string;
	link: KakaoShareLink;
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
