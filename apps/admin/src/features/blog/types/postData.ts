import type { PartialBlock } from '@blocknote/core';
// FIXME: Post로 변경

export interface PostData {
	title: string;
	content: PartialBlock[];
	lastSaved?: string;
	imagesrc: string;
	tags: string[];
	category: string;
	description: string;
}
