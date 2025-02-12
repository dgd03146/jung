import type { ViewMode } from '@/fsd/entities/post';
import { Button, Flex } from '@jung/design-system';
import { BsFillPlayFill, BsGrid3X3Gap } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';

interface SelectViewModeProps {
	selected: ViewMode;
	onSelect: (mode: ViewMode) => void;
}

export const SelectViewMode = ({ selected, onSelect }: SelectViewModeProps) => {
	return (
		<Flex gap='1'>
			<Button
				variant='outline'
				selected={selected === 'list'}
				borderRadius='md'
				onClick={() => onSelect('list')}
				title='List view'
			>
				<CiViewList size={28} />
			</Button>
			<Button
				variant='outline'
				selected={selected === 'grid'}
				borderRadius='md'
				onClick={() => onSelect('grid')}
				title='Grid view'
			>
				<BsGrid3X3Gap size={28} />
			</Button>
			<Button
				variant='outline'
				selected={selected === 'table'}
				borderRadius='md'
				onClick={() => onSelect('table')}
				title='Table view'
			>
				<BsFillPlayFill size={28} />
			</Button>
		</Flex>
	);
};
