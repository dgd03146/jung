import { Container, Flex } from '@jung/design-system/components';
import { usePostEditor } from '../../model/usePostEditor';
import ErrorFallback from '../ErrorFallback';
import { BlockNote } from './BlockNote';
import EditorHeader from './EditorHeader';
import { ImagePreview } from './ImagePreview';
import PostEditorSkeleton from './PostEditorSkeleton';
import TitleSection from './TitleSection';

const PostEditor = () => {
	const {
		localPost,
		editor,
		formErrors,
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
			<Flex direction='column' marginBottom='20'>
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
					validateErrors={formErrors || {}}
				/>
				<TitleSection
					post={localPost}
					onFieldChange={handleFieldChange}
					errors={formErrors || {}}
				/>

				<BlockNote editor={editor} />
			</Flex>
		</Container>
	);
};

export default PostEditor;
