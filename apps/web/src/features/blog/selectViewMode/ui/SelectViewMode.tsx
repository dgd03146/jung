import { Button, Flex } from '@jung/design-system/components';
import type { ReactNode } from 'react';
import { BsGrid3X3Gap, BsTable } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import type { ViewMode } from '@/fsd/entities/blog';

const VIEW_MODE_OPTIONS: { mode: ViewMode; icon: ReactNode; label: string }[] =
	[
		{ mode: 'list', icon: <CiViewList size={16} />, label: 'List view' },
		{ mode: 'grid', icon: <BsGrid3X3Gap size={16} />, label: 'Grid view' },
		{ mode: 'table', icon: <BsTable size={16} />, label: 'Table view' },
	];

interface SelectViewModeProps {
	selected: ViewMode;
	onSelect: (mode: ViewMode) => void;
}

export const SelectViewMode = ({ selected, onSelect }: SelectViewModeProps) => {
	return (
		<Flex gap='1' height='full'>
			{VIEW_MODE_OPTIONS.map(({ mode, icon, label }) => (
				<Button
					key={mode}
					variant='outline'
					selected={selected === mode}
					borderRadius='md'
					size='sm'
					paddingX='1.5'
					paddingY='1'
					onClick={() => onSelect(mode)}
					title={label}
				>
					{icon}
				</Button>
			))}
		</Flex>
	);
};
