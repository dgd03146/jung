import {
	type HTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from 'react';
import { Box } from '..';

import type { BoxProps } from '..';

import { useSelectContext } from './SelectProvider';

interface Props extends PropsWithChildren<HTMLAttributes<HTMLUListElement>> {}

// FIXME: 어떻게 List 컴포넌트를 활용할 수 있을까?

type ListProps = BoxProps<'ul', Props>;
export type ListComponent = (props: ListProps) => ReactNode;

export const SelectMenu: ListComponent = forwardRef(
	({ children, ...restProps }, ref?) => {
		// value가 있으면 value 없으면 placeholder
		const { open, onValueChange, setSelectedOption, selectedOption, setOpen } =
			useSelectContext();

		return (
			<Box
				as='ul'
				id='lisbox'
				role='listbox'
				aria-labelledby='label'
				hidden={!open}
				// FIXME: 나주엥 aria-activedescendant 바꿔야함
				aria-activedescendant={selectedOption?.label}
				background='gray100'
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
