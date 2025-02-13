import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import type { Errors } from '../types/errors';

export const validatePostData = (postData: PostWithBlockContent): Errors => {
	return {
		imagesrc: !postData.imagesrc ? 'Featured image is required' : '',
		title: !postData.title.trim() ? 'Title is required' : '',
		description: !postData.description.trim() ? 'Description is required' : '',
		category_id: !postData.category_id.trim() ? 'Category is required' : '',
		date: !postData.date ? 'Date is required' : '',
	};
};
