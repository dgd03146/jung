import { Button, Flex } from '@jung/design-system/components';
import { BsFillPlayFill, BsGrid3X3Gap } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import type { ViewMode } from '@/fsd/entities/blog';

interface SelectViewModeProps {
	selected: ViewMode;
	onSelect: (mode: ViewMode) => void;
}

export const SelectViewMode = ({ selected, onSelect }: SelectViewModeProps) => {
	return (
		<Flex gap='1' height='full'>
			<Button
				variant='outline'
				selected={selected === 'list'}
				borderRadius='md'
				size='sm'
				paddingX='1.5'
				paddingY='1'
				onClick={() => onSelect('list')}
				title='List view'
			>
				<CiViewList size={16} />
			</Button>
			<Button
				variant='outline'
				selected={selected === 'grid'}
				borderRadius='md'
				size='sm'
				paddingX='1.5'
				paddingY='1'
				onClick={() => onSelect('grid')}
				title='Grid view'
			>
				<BsGrid3X3Gap size={16} />
			</Button>
			<Button
				variant='outline'
				selected={selected === 'table'}
				borderRadius='md'
				size='sm'
				paddingX='1.5'
				paddingY='1'
				onClick={() => onSelect('table')}
				title='Table view'
			>
				<BsFillPlayFill size={16} />
			</Button>
		</Flex>
	);
};
