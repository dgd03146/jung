import { Flex } from '@jung/design-system/components';
import { ArticleTable } from '@/fsd/features/articles/ui';

const ArticlesPage = () => {
	return (
		<Flex direction='column' gap='4'>
			<ArticleTable />
		</Flex>
	);
};

export default ArticlesPage;
