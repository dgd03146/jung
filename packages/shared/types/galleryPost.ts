// FIXME: ZOD 타입 정의 후 변경

export interface GalleryPost {
	id: number;
	imageUrl: string;
	alt: string;
	description?: string;
	tags?: string[];
	createdAt: string;
	likes?: number;
	views?: number;
	author?: {
		name: string;
		avatarUrl?: string;
	};
}
