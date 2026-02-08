export type HeadingItem = {
	id: string;
	text: string;
	level: 1 | 2 | 3;
};

type InlineContent = {
	type: string;
	text?: string;
};

type BlockContent = {
	id?: string;
	type: string;
	props?: {
		level?: 1 | 2 | 3;
		[key: string]: unknown;
	};
	content?: InlineContent[];
	children?: BlockContent[];
};

export const extractHeadings = (content: unknown): HeadingItem[] => {
	if (!content || !Array.isArray(content)) {
		return [];
	}

	const headings: HeadingItem[] = [];
	const blocks = content as BlockContent[];

	const traverse = (block: BlockContent) => {
		if (block.type === 'heading' && block.content) {
			const text = block.content
				.filter((c): c is { type: 'text'; text: string } => c.type === 'text')
				.map((c) => c.text)
				.join('');

			if (text.trim()) {
				headings.push({
					id: block.id || `heading-${headings.length}`,
					text: text.trim(),
					level: block.props?.level || 1,
				});
			}
		}
		if (block.children) {
			for (const child of block.children) {
				traverse(child);
			}
		}
	};

	for (const block of blocks) {
		traverse(block);
	}

	return headings;
};
