export interface Post {
	id: string;
	title: string;
	content: string;
	description: string;
	author: {
		id: string;
		name: string;
	};
	tags: string[];
	date: {
		created: Date;
		updated: Date;
		published?: Date;
	};
	status: 'draft' | 'published' | 'scheduled';
	slug: string;
	views: number;
	image: {
		url: string;
		alt: string;
	};
	metadata: {
		language: string;
		readingTime: number;
	};
}
