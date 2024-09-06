import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { FormattingToolbarController } from '@blocknote/react';
import { Box, Container, Flex } from '@jung/design-system/components';

import { usePostEditor } from '../../model/usePostEditor';
import EditorHeader from './EditorHeader';
import { FormattingToolbarComponent } from './FormattingToolbar';
import TitleSection from './TitleSection';

const PostEditor = () => {
	const {
		postData,
		editor,
		handleTitleChange,
		handleSave,
		handleDiscard,
		handleTagsChange,
		handleImageUpload,
	} = usePostEditor();

	return (
		<Container maxWidth='laptop' marginX='auto' height='full'>
			<Flex direction='column' gap='4'>
				<EditorHeader onSave={handleSave} onDiscard={handleDiscard} />
				<TitleSection
					title={postData.title}
					onTitleChange={handleTitleChange}
					onAddImage={handleImageUpload}
					onAddTags={handleTagsChange}
					tags={postData.tags}
				/>
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
			</Flex>
		</Container>
	);
};

export default PostEditor;
