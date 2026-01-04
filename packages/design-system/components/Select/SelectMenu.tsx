import { forwardRef, type LiHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import { useSelectContext } from './context/SelectProvider';

export interface Props
	extends Omit<LiHTMLAttributes<HTMLUListElement>, 'color'>,
		AtomProps {}

export const SelectMenu = forwardRef<HTMLUListElement, Props>(
	({ children, ...restProps }, ref?) => {
		// value가 있으면 value 없으면 placeholder
		const { open, selectedOption } = useSelectContext();

		return (
			<Box
				as='ul'
				id='lisbox'
				role='listbox'
				aria-labelledby='label'
				hidden={!open}
				// FIXME: 나주엥 aria-activedescendant 바꿔야함
				aria-activedescendant={selectedOption?.label}
				background='primary200'
				width='fit'
				// minWidth="40"

				ref={ref}
				{...restProps}
			>
				{open ? children : null}
			</Box>
		);
	},
);
