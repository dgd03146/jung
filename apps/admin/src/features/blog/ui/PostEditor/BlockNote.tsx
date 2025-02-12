import '@/fsd/app/styles/editorStyle.css';
import type { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { FormattingToolbarController } from '@blocknote/react';
import { Box } from '@jung/design-system/components';
import { FormattingToolbarComponent } from './FormattingToolbar';

type Props = {
	editor: BlockNoteEditor;
};

const BlockNote = ({ editor }: Props) => {
	return (
		<Box borderWidth='hairline' borderColor='gray100' borderRadius='md'>
			<BlockNoteView
				editor={editor}
				theme='light'
				linkToolbar={true}
				sideMenu={true}
				slashMenu={true}
				emojiPicker={true}
			>
				<FormattingToolbarController
					formattingToolbar={FormattingToolbarComponent}
				/>
			</BlockNoteView>
		</Box>
	);
};

export default BlockNote;
