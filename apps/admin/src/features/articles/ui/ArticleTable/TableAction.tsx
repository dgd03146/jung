import { Button, Flex, Input } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import { useArticleTableFilter } from '../../model';

const TableAction = () => {
	const { filter, handleFilterChange } = useArticleTableFilter();

	return (
		<Flex
			justify='space-between'
			align='center'
			background='white'
			borderRadius='lg'
			padding='4'
			marginBottom='4'
		>
			<Input
				type='text'
				value={filter ?? ''}
				borderRadius='md'
				fontSize='md'
				onChange={handleFilterChange}
				placeholder='Search articles...'
			/>
			<Link to='/articles/new'>
				<Button borderRadius='md' size='md'>
					<FaPlus size={14} />
					New
				</Button>
			</Link>
		</Flex>
	);
};

export default TableAction;
