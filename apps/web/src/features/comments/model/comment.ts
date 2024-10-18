export interface Comment {
	id: string;
	userId: string;
	userName: string;
	userProfileImage: string;
	content: string;
	createdAt: string;
	likes: number;
	provider: string;
	parentId: string | null;
	replies?: Comment[];
}
