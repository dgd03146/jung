import { Button, Input, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { usePostTableFilter } from '@/fsd/features/blog/model';
import { useGetCategories } from '@/fsd/shared';
import { FilterBar } from '@/fsd/shared/ui';

interface TableActionProps {
	totalCount?: number;
}

const TableAction = ({ totalCount }: TableActionProps) => {
	const {
		filter,
		category,
		handleFilterChange,
		handleCategoryChange,
		clearFilters,
		hasActiveFilters,
	} = usePostTableFilter();

	const { data: categoriesData } = useGetCategories('blog');

	const categoryOptions = useMemo(() => {
		const options = [{ value: '', label: 'All Categories' }];
		if (categoriesData?.allCategories) {
			for (const cat of categoriesData.allCategories) {
				options.push({ value: cat.id, label: cat.name });
			}
		}
		return options;
	}, [categoriesData]);

	return (
		<FilterBar>
			<FilterBar.Group>
				<Input
					type='text'
					value={filter ?? ''}
					borderRadius='md'
					fontSize='md'
					onChange={handleFilterChange}
					placeholder='Search posts...'
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
						{totalCount} posts
					</Typography.SubText>
				)}
			</FilterBar.Group>
			<Link to='/blog/new'>
				<Button borderRadius='md' size='md'>
					<FaPlus size={14} />
					New
				</Button>
			</Link>
		</FilterBar>
	);
};

export default TableAction;
