import { useCreateBlockNote } from '@blocknote/react';
import { Container } from '@jung/design-system/components';
import type { Post } from '@jung/server/schemas/post';
import BlockNote from './BlockNote';
import Comments from './Comments';

type Props = {
	post: Post;
};

const PostContent = ({ post }: Props) => {
	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container>
			<BlockNote editor={editor} />
			{/* TODO: Comments Suspense로 */}
			<Comments />
		</Container>
	);
};

export default PostContent;
