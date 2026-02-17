export const categoryKeys = {
	all: (type: 'blog' | 'places') => ['categories', type] as const,
};

export const newsletterKeys = {
	all: ['newsletter'] as const,
	logs: (articleId: string) =>
		[...newsletterKeys.all, 'logs', articleId] as const,
};
