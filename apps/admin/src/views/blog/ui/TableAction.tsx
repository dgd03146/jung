import { Routes } from '@/fsd/shared';
import { Button, Flex, Input } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { FaPlus } from 'react-icons/fa';
import { usePostFilter } from '../model/usePostFilter';

const TableAction = () => {
	const { filter, handleFilterChange } = usePostFilter();

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
					<FaPlus /> new
				</Button>
			</Link>
		</Flex>
	);
};

export default TableAction;
