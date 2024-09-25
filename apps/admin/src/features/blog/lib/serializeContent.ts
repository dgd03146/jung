import type { Block } from '@blocknote/core';

export const serializeContent = (content: Block[]) => {
	return JSON.stringify(content);
};

export const deserializeContent = (content: string): Block[] => {
	return JSON.parse(content);
};
