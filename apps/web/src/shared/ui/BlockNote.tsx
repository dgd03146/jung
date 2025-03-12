'use client';

import '@/fsd/app/styles/editorStyle.css';
import {
	BlockNoteSchema,
	customizeCodeBlock,
	defaultBlockSpecs,
} from '@blocknote/core';
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

const customCodeBlock = customizeCodeBlock({
	defaultLanguage: 'typescript',
	supportedLanguages: [
		{ id: 'javascript', match: ['javascript', 'js'], name: 'JavaScript' },
		{ id: 'typescript', match: ['typescript', 'ts'], name: 'TypeScript' },
		{ id: 'html', match: ['html'], name: 'HTML' },
		{ id: 'css', match: ['css'], name: 'CSS' },
		{ id: 'json', match: ['json'], name: 'JSON' },
		{ id: 'markdown', match: ['markdown', 'md'], name: 'Markdown' },
	],
});

const schema = BlockNoteSchema.create({
	blockSpecs: {
		...defaultBlockSpecs,
		codeBlock: customCodeBlock,
	},
});
type CustomPartialBlock = typeof schema.PartialBlock;

type Props = {
	initialContent: CustomPartialBlock[];
};

export const BlockNote = ({ initialContent }: Props) => {
	const editor = useCreateBlockNote({
		initialContent,
		schema,
	});

	return (
		<Box borderWidth='hairline' borderColor='gray100' borderRadius='md'>
			<BlockNoteView
				editor={editor}
				editable={false}
				formattingToolbar={false}
				theme='light'
			>
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
