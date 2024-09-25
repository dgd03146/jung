import { Routes } from '@/fsd/shared';
import { Button, Flex, Input } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import { usePostTableFilter } from '../../model/usePostTableFilter';

const TableAction = () => {
	const { filter, handleFilterChange } = usePostTableFilter();

	return (
		<Flex justifyContent='space-between' marginBottom='6'>
			<Input
				boxShadow='primary'
				border='none'
				rounded
				value={filter ?? ''}
				onChange={handleFilterChange}
				placeholder='search...'
			/>
			<Link to={`${Routes.blog.path}/new`}>
				<Button boxShadow='primary' border='none' rounded>
					<FaPlus /> New
				</Button>
			</Link>
		</Flex>
	);
};

export default TableAction;
