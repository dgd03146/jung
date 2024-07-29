import { Container, Flex } from '@jung/design-system/components';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostSidebar from './PostSidebar';

const PostDetail = () => {
	return (
		<Container>
			<PostHeader />
			<Flex paddingY='10' columnGap='20'>
				<PostSidebar />
				<PostContent />
			</Flex>
		</Container>
	);
};

export default PostDetail;
