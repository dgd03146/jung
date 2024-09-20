import type { Errors } from '../types/errors';
import type { PostData } from '../types/postData';

export const validatePostData = (postData: PostData): Errors => {
	return {
		imagesrc: !postData.imagesrc ? 'Featured image is required' : '',
		title: !postData.title.trim() ? 'Title is required' : '',
		description: !postData.description.trim() ? 'Description is required' : '',
		category: !postData.category ? 'Category is required' : '',
	};
};
