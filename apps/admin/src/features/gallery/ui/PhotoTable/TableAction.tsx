import { Button, Flex, Input } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiPlus } from 'react-icons/hi';
import { usePhotoTableFilter } from '../../model/usePhotoTableFilter';

export const TableAction = () => {
	const { filter, handleFilterChange } = usePhotoTableFilter();

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
				onChange={handleFilterChange}
				placeholder='Search photos...'
				borderRadius='md'
				fontSize='md'
			/>
			<Link to='/gallery/photos/new'>
				<Button borderRadius='md' size='md'>
					<HiPlus size={14} />
					New Photos
				</Button>
			</Link>
		</Flex>
	);
};
