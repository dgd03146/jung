import { forwardRef, type LiHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import { useSelectContext } from './context/SelectProvider';

export interface Props
	extends Omit<LiHTMLAttributes<HTMLUListElement>, 'color'>,
		AtomProps {}

export const SelectMenu = forwardRef<HTMLUListElement, Props>(
	({ children, ...restProps }, ref?) => {
		const { open, selectedOption } = useSelectContext();

		return (
			<Box
				as='ul'
				id='lisbox'
				role='listbox'
				aria-labelledby='label'
				hidden={!open}
				aria-activedescendant={selectedOption?.label}
				background='primary200'
				width='fit'
				ref={ref}
				{...restProps}
			>
				{open ? children : null}
			</Box>
		);
	},
);
