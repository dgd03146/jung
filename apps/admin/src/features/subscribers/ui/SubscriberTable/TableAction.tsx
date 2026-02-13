import { Input, Typography } from '@jung/design-system/components';
import { useSubscriberTableFilter } from '@/fsd/features/subscribers/model';
import { FilterBar } from '@/fsd/shared/ui';

interface TableActionProps {
	totalCount?: number;
}

const categoryOptions = [
	{ value: '', label: 'All Categories' },
	{ value: 'frontend', label: 'Frontend' },
	{ value: 'ai', label: 'AI' },
	{ value: 'both', label: 'Both' },
];

const statusOptions = [
	{ value: '', label: 'All Status' },
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
];

const TableAction = ({ totalCount }: TableActionProps) => {
	const {
		filter,
		category,
		status,
		handleFilterChange,
		handleCategoryChange,
		handleStatusChange,
		clearFilters,
		hasActiveFilters,
	} = useSubscriberTableFilter();

	return (
		<FilterBar>
			<FilterBar.Group>
				<Input
					type='text'
					value={filter ?? ''}
					borderRadius='md'
					fontSize='md'
					onChange={handleFilterChange}
					placeholder='Search by email...'
				/>
				<FilterBar.Select
					label='Category'
					options={categoryOptions}
					value={category}
					onChange={handleCategoryChange}
				/>
				<FilterBar.Select
					label='Status'
					options={statusOptions}
					value={status}
					onChange={handleStatusChange}
				/>
				{hasActiveFilters && <FilterBar.Clear onClick={clearFilters} />}
				{totalCount != null && (
					<Typography.SubText
						level={1}
						color='primary300'
						style={{ whiteSpace: 'nowrap' }}
					>
						{totalCount} subscribers
					</Typography.SubText>
				)}
			</FilterBar.Group>
		</FilterBar>
	);
};

export default TableAction;
