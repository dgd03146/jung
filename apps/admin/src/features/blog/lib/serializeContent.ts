import type { Block } from '@blocknote/core';

// FIXME: shared 함수로 빼기

export const serializeContent = (content: Block[]) => {
	return JSON.stringify(content);
};

export const deserializeContent = (content: string): Block[] => {
	return JSON.parse(content);
};
