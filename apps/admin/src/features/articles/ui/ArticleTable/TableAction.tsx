import { Button, Input, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FilterBar } from '@/fsd/shared/ui';
import { useArticleTableFilter } from '../../model';

interface TableActionProps {
	totalCount?: number;
}

const TableAction = ({ totalCount }: TableActionProps) => {
	const {
		filter,
		status,
		category,
		handleFilterChange,
		handleStatusChange,
		handleCategoryChange,
		clearFilters,
		hasActiveFilters,
	} = useArticleTableFilter();

	const categoryOptions = useMemo(
		() => [
			{ value: '', label: 'All Categories' },
			{ value: 'frontend', label: 'Frontend' },
			{ value: 'ai', label: 'AI' },
		],
		[],
	);

	const statusOptions = useMemo(
		() => [
			{ value: '', label: 'All Status' },
			{ value: 'draft', label: 'Draft' },
			{ value: 'published', label: 'Published' },
		],
		[],
	);

	return (
		<FilterBar>
			<FilterBar.Group>
				<Input
					type='text'
					value={filter ?? ''}
					borderRadius='md'
					fontSize='md'
					onChange={handleFilterChange}
					placeholder='Search articles...'
				/>
				<FilterBar.Select
					label='Status'
					options={statusOptions}
					value={status}
					onChange={handleStatusChange}
				/>
				<FilterBar.Select
					label='Category'
					options={categoryOptions}
					value={category}
					onChange={handleCategoryChange}
				/>
				{hasActiveFilters && <FilterBar.Clear onClick={clearFilters} />}
				{totalCount != null && (
					<Typography.SubText
						level={1}
						color='primary300'
						style={{ whiteSpace: 'nowrap' }}
					>
						{totalCount} articles
					</Typography.SubText>
				)}
			</FilterBar.Group>
			<Link to='/articles/new'>
				<Button borderRadius='md' size='md'>
					<FaPlus size={14} />
					New
				</Button>
			</Link>
		</FilterBar>
	);
};

export default TableAction;
