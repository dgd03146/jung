import { Button, Input, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGetCategories } from '@/fsd/shared';
import { FilterBar } from '@/fsd/shared/ui';
import { usePlaceTableFilter } from '../../model/usePlaceTableFilter';

interface TableActionProps {
	totalCount?: number;
}

export const TableAction = ({ totalCount }: TableActionProps) => {
	const {
		filter,
		category,
		handleFilterChange,
		handleCategoryChange,
		clearFilters,
		hasActiveFilters,
	} = usePlaceTableFilter();

	const { data: categoriesData } = useGetCategories('places');

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
					placeholder='Search places...'
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
						{totalCount} places
					</Typography.SubText>
				)}
			</FilterBar.Group>
			<Link to='/places/new'>
				<Button borderRadius='md' size='md'>
					<FaPlus size={14} />
					New
				</Button>
			</Link>
		</FilterBar>
	);
};
