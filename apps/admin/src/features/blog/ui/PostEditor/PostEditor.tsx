import { Container, Flex } from '@jung/design-system/components';

import { usePostEditor } from '../../model/usePostEditor';
import BlockNote from './BlockNote';
import EditorHeader from './EditorHeader';
import { ImageUpload } from './ImageUpload';
import TitleSection from './TitleSection';

const PostEditor = () => {
	const {
		post,
		editor,
		errors,
		handleSave,
		handleDiscard,
		handleFieldChange,
		// handleImageUpload,
		handleCreate,
		isCreating,
		isUploading,
		setImageFile,
	} = usePostEditor();

	return (
		<Container maxWidth='laptop' marginX='auto' height='full'>
			<Flex direction='column' gap='2'>
				<EditorHeader
					onSave={handleSave}
					onDiscard={handleDiscard}
					onCreate={handleCreate}
					isCreating={isCreating}
				/>
				<ImageUpload
					isUploading={isUploading}
					imagesrc={post.imagesrc}
					onSetImageFile={setImageFile}
					// onUploadImage={handleImageUpload}
					onFieldChange={handleFieldChange}
					errors={errors}
				/>
				<TitleSection
					post={post}
					onFieldChange={handleFieldChange}
					errors={errors}
				/>
				<BlockNote editor={editor} />
			</Flex>
		</Container>
	);
};

export default PostEditor;
