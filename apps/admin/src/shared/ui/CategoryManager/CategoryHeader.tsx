import { Button, Flex, Typography } from '@jung/design-system/components';
import { CiCircleList, CiGrid41 } from 'react-icons/ci';
import { HiPlus } from 'react-icons/hi2';
import * as styles from './CategoryHeader.css';

interface CategoryHeaderProps {
	view: 'grid' | 'list';
	onViewChange: (view: 'grid' | 'list') => void;
	onAddNew: () => void;
	type: 'blog' | 'places';
}

export const CategoryHeader = ({
	view,
	onViewChange,
	onAddNew,
	type,
}: CategoryHeaderProps) => {
	const title =
		type === 'blog' ? 'Blog Category Management' : 'Place Category Management';

	const buttonText =
		type === 'blog' ? 'New Blog Category' : 'New Place Category';

	return (
		<Flex
			paddingY='5'
			paddingX='6'
			align='center'
			justify='space-between'
			borderStyle='solid'
			borderColor='primary50'
			className={styles.borderBottom}
		>
			<Typography.Heading level={5} color='primary'>
				{title}
			</Typography.Heading>
			<Flex gap='4' align='center'>
				<Flex borderRadius='md' background='primary50'>
					<Button
						size='sm'
						variant='outline'
						borderRadius='sm'
						selected={view === 'grid'}
						onClick={() => onViewChange('grid')}
					>
						<CiGrid41 size={20} />
					</Button>
					<Button
						size='sm'
						variant='outline'
						borderRadius='sm'
						selected={view === 'list'}
						onClick={() => onViewChange('list')}
					>
						<CiCircleList size={20} />
					</Button>
				</Flex>
				<Button onClick={onAddNew} borderRadius='md'>
					<HiPlus />
					{buttonText}
				</Button>
			</Flex>
		</Flex>
	);
};
