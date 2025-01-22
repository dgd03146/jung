import type { Metadata } from 'next';

interface GenerateMetadataProps {
	title: string;
	description: string;
	image?: string;
	noIndex?: boolean;
	alternates?: {
		canonical?: string;
		languages?: Record<string, string>;
	};
}

export function generateMetadata({
	title,
	description,
	image = '/og-image.jpg',
	noIndex = false,
	alternates,
}: GenerateMetadataProps): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
		alternates,
		robots: {
			index: !noIndex,
			follow: !noIndex,
		},
	};
}
