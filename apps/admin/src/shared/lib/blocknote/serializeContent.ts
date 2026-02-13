import type { Block } from '@blocknote/core';

export const serializeContent = (content: Block[]): string => {
	return JSON.stringify(content);
};

export const deserializeContent = (content: string): Block[] => {
	const parsed: unknown = JSON.parse(content);

	if (!Array.isArray(parsed)) {
		throw new Error('Invalid content: expected an array of blocks');
	}

	return parsed as Block[];
};
