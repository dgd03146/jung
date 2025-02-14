import '@/fsd/app/styles/editorStyle.css';
import type { BlockNoteEditor } from '@blocknote/core';
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
} from '@blocknote/react';
import { Box } from '@jung/design-system/components';

type Props = {
	editor: BlockNoteEditor;
};

const BlockNote = ({ editor }: Props) => {
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

export default BlockNote;
