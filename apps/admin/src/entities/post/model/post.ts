// FIXME: 나중에 수정..

// export type Post = {
// 	id: string;
// 	title: string;
// 	content: string; // BlockNote 에디터의 내용을 JSON 문자열로 저장
// 	publishedDate: string; // 게시일
// 	lastModifiedDate: string; // 최종 수정일
// 	status: 'draft' | 'published' | 'archived'; // 포스트 상태
// 	featuredImage: string; // 대표 이미지 URL
// 	tags: string[];
// 	categories: string[]; // 카테고리 (태그보다 더 넓은 분류)
// 	slug: string; // URL 친화적인 제목
// 	metadata: {
// 			views: number;
// 			likes: number;
// 			comments: number;
// 	};
// 	seo: {
// 			metaTitle: string;
// 			metaDescription: string;
// 			keywords: string[];
// 	};
// };

export type Post = {
	id: string;
	imagesrc: string;
	date: string;
	tags: string[];
	title: string;
	category: string;
	description: string;
	content: string;
};

export type AdminPost = Omit<Post, 'imagesrc'>;
