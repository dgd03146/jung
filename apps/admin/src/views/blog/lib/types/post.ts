import type { PartialBlock } from '@blocknote/core';

export interface PostData {
	title: string;
	content: PartialBlock[];
	lastSaved?: string;
	imagesrc: string;
	tags: string[];
}
