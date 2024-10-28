export type CategoryId =
	| 'all'
	| 'life'
	| 'travel'
	| 'food'
	| 'fashion'
	| 'culture';

export interface Category {
	id: CategoryId;
	name: string;
	displayName: {
		ko: string;
		en: string;
	};
	description?: {
		ko: string;
		en: string;
	};
}
