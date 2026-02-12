import { Flex } from '@jung/design-system/components';
import { PostTable } from '@/fsd/features/blog/ui';

const BlogPage = () => {
	return (
		<Flex direction='column' gap='4'>
			<PostTable />
		</Flex>
	);
};

export default BlogPage;
