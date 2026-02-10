'use client';

import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import * as styles from './MessageItem.css';

function parseMarkdownIntoBlocks(markdown: string): string[] {
	const tokens = marked.lexer(markdown);
	return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
	({ content }: { content: string }) => (
		<ReactMarkdown
			components={{
				a: ({ href, children }) => (
					<a href={href} target='_blank' rel='noopener noreferrer'>
						{children}
					</a>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	),
	(prev, next) => prev.content === next.content,
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(
	({ content, id }: { content: string; id: string }) => {
		const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

		return (
			<div className={styles.markdownContent}>
				{blocks.map((block, index) => (
					<MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
				))}
			</div>
		);
	},
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
