'use client';

import { createHighlighter } from '@/fsd/shared/lib/shiki.bundle';
import type { PartialBlock } from '@blocknote/core';
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
import './BlockNote.css';

type Props = {
	initialContent: PartialBlock[];
};

export const BlockNote = ({ initialContent }: Props) => {
	const editor = useCreateBlockNote({
		initialContent,
		codeBlock: {
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
