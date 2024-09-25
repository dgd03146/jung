import { Container, Flex } from '@jung/design-system/components';
import { usePostEditor } from '../../model/usePostEditor';
import ErrorFallback from '../ErrorFallback';
import BlockNote from './BlockNote';
import EditorHeader from './EditorHeader';
import { ImagePreview } from './ImagePreview';
import PostEditorSkeleton from './PostEditorSkeleton';
import TitleSection from './TitleSection';

const PostEditor = () => {
	const {
		localPost,
		editor,
		validateErrors,
		handleSave,
		handleDiscard,
		handleFieldChange,
		handleSubmit,
		isSubmitting,
		setImageFile,
		isLoading,
		fetchError,
		fetchedPost,
		refetch,
	} = usePostEditor();

	if (isLoading) return <PostEditorSkeleton />;
	if (fetchError)
		return <ErrorFallback error={fetchError} resetErrorBoundary={refetch} />;

	return (
		<Container maxWidth='tablet' marginX='auto' height='full'>
			<Flex direction='column' gap='2'>
				<EditorHeader
					onSave={handleSave}
					onDiscard={handleDiscard}
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
					isEditMode={!!fetchedPost}
				/>
				<ImagePreview
					imagesrc={localPost.imagesrc}
					onSetImageFile={setImageFile}
					onFieldChange={handleFieldChange}
					validateErrors={validateErrors}
				/>
				<TitleSection
					post={localPost}
					onFieldChange={handleFieldChange}
					errors={validateErrors}
				/>
				<BlockNote editor={editor} />
			</Flex>
		</Container>
	);
};

export default PostEditor;
