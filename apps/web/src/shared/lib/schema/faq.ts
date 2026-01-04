import type { FAQPage, WithContext } from './types';

type FAQItem = {
	question: string;
	answer: string;
};

export const createFAQPageSchema = (items: FAQItem[]): WithContext<FAQPage> => {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question' as const,
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer' as const,
				text: item.answer,
			},
		})),
	};
};
