import { Button, Input, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiPlus } from 'react-icons/hi';
import { FilterBar } from '@/fsd/shared/ui';
import { usePhotoTableFilter } from '../../model/usePhotoTableFilter';

interface TableActionProps {
	totalCount?: number;
}

export const TableAction = ({ totalCount }: TableActionProps) => {
	const { filter, handleFilterChange } = usePhotoTableFilter();

	return (
		<FilterBar>
			<FilterBar.Group>
				<Input
					type='text'
					value={filter ?? ''}
					onChange={handleFilterChange}
					placeholder='Search photos...'
					borderRadius='md'
					fontSize='md'
				/>
				{totalCount != null && (
					<Typography.SubText
						level={1}
						color='primary300'
						style={{ whiteSpace: 'nowrap' }}
					>
						{totalCount} photos
					</Typography.SubText>
				)}
			</FilterBar.Group>
			<Link to='/gallery/photos/new'>
				<Button borderRadius='md' size='md'>
					<HiPlus size={14} />
					New Photos
				</Button>
			</Link>
		</FilterBar>
	);
};
