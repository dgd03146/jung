'use client';

import Script from 'next/script';

export function KakaoProvider() {
	return (
		<Script
			src='//developers.kakao.com/sdk/js/kakao.min.js'
			strategy='afterInteractive'
			onLoad={() => {
				if (window.Kakao) {
					if (!window.Kakao.isInitialized()) {
						window.Kakao.init(
							process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string,
						);
					}
				}
			}}
		/>
	);
}
