import { Button, Flex } from '@jung/design-system/components';
import type { ComponentType } from 'react';
import { BsGrid3X3Gap, BsTable } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import type { ViewMode } from '@/fsd/entities/blog';

const VIEW_MODE_OPTIONS: {
	mode: ViewMode;
	Icon: ComponentType<{ size?: number }>;
	label: string;
}[] = [
	{ mode: 'list', Icon: CiViewList, label: 'List view' },
	{ mode: 'grid', Icon: BsGrid3X3Gap, label: 'Grid view' },
	{ mode: 'table', Icon: BsTable, label: 'Table view' },
];

interface SelectViewModeProps {
	selected: ViewMode;
	onSelect: (mode: ViewMode) => void;
}

export const SelectViewMode = ({ selected, onSelect }: SelectViewModeProps) => {
	return (
		<Flex gap='1' height='full'>
			{VIEW_MODE_OPTIONS.map(({ mode, Icon, label }) => (
				<Button
					key={mode}
					variant='outline'
					selected={selected === mode}
					borderRadius='md'
					size='sm'
					paddingX='1.5'
					paddingY='1'
					onClick={() => onSelect(mode)}
					aria-label={label}
					title={label}
				>
					<Icon size={16} />
				</Button>
			))}
		</Flex>
	);
};
