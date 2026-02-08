'use client';

import type { PartialBlock } from '@blocknote/core';
import { createHighlighter } from '@/fsd/shared/lib/shiki.bundle';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
	BasicTextStyleButton,
	BlockTypeSelect,
	ColorStyleButton,
	CreateLinkButton,
	FileCaptionButton,
	FileReplaceButton,
	FormattingToolbar,
	FormattingToolbarController,
	NestBlockButton,
	TextAlignButton,
	UnnestBlockButton,
	useCreateBlockNote,
} from '@blocknote/react';
import { Box } from '@jung/design-system/components';
import { useEffect } from 'react';
import type { HeadingItem } from '../lib/extractHeadings';
import './BlockNote.css';

type Props = {
	initialContent: PartialBlock[];
	headings?: HeadingItem[];
};

export const BlockNote = ({ initialContent, headings = [] }: Props) => {
	useEffect(() => {
		if (headings.length === 0) return;

		const timer = setTimeout(() => {
			const headingElements = document.querySelectorAll(
				'.bn-block-content[data-content-type="heading"]',
			);

			headingElements.forEach((el, index) => {
				if (headings[index]) {
					el.id = headings[index].id;
				}
			});
		}, 100);

		return () => clearTimeout(timer);
	}, [headings]);

	const editor = useCreateBlockNote({
		initialContent,
		codeBlock: {
			defaultLanguage: 'tsx',
			supportedLanguages: {
				javascript: {
					name: 'JavaScript',
					aliases: ['js'],
				},
				typescript: {
					name: 'TypeScript',
					aliases: ['ts'],
				},
				html: {
					name: 'Html',
				},
				css: {
					name: 'Css',
				},
				json: {
					name: 'Json',
				},
				jsx: {
					name: 'Jsx',
				},
				tsx: {
					name: 'Tsx',
				},
				markdown: {
					name: 'Markdown',
					aliases: ['md'],
				},
			},
			createHighlighter: () =>
				createHighlighter({
					themes: ['one-light'],
					langs: [
						'javascript',
						'typescript',
						'html',
						'css',
						'json',
						'markdown',
						'jsx',
						'tsx',
					],
				}),
		},
	});

	return (
		<Box borderWidth='hairline' borderColor='gray100' borderRadius='md'>
			<BlockNoteView editor={editor} editable={false} formattingToolbar={false}>
				<FormattingToolbarController
					formattingToolbar={() => (
						<FormattingToolbar>
							<BlockTypeSelect key={'blockTypeSelect'} />

							<FileCaptionButton key={'fileCaptionButton'} />
							<FileReplaceButton key={'replaceFileButton'} />

							<BasicTextStyleButton
								basicTextStyle={'bold'}
								key={'boldStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'italic'}
								key={'italicStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'underline'}
								key={'underlineStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'strike'}
								key={'strikeStyleButton'}
							/>
							<BasicTextStyleButton
								basicTextStyle={'code'}
								key={'codeStyleButton'}
							/>

							<TextAlignButton
								textAlignment={'left'}
								key={'textAlignLeftButton'}
							/>
							<TextAlignButton
								textAlignment={'center'}
								key={'textAlignCenterButton'}
							/>
							<TextAlignButton
								textAlignment={'right'}
								key={'textAlignRightButton'}
							/>

							<ColorStyleButton key={'colorStyleButton'} />

							<NestBlockButton key={'nestBlockButton'} />
							<UnnestBlockButton key={'unnestBlockButton'} />

							<CreateLinkButton key={'createLinkButton'} />
						</FormattingToolbar>
					)}
				/>
			</BlockNoteView>
		</Box>
	);
};
