'use client';

import {
	type PropsWithChildren,
	type ReactNode,
	type SelectHTMLAttributes,
	forwardRef,
} from 'react';
import { Box, type BoxProps } from '..';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectMenu } from './SelectMenu';
import SelectProvider from './SelectProvider';
import { SelectTrigger } from './SelectTrigger';

// FIXME: Provider 굳이 div태그로 안 감싸도 괜찮은듯?

type Props = {
	placeHolder?: string;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
};

type SelectElementProps = PropsWithChildren<
	SelectHTMLAttributes<HTMLSelectElement>
>;
type SelectProps = SelectElementProps & Props;
type SelectPropsWithBox = BoxProps<'select', SelectProps>;
type SelectComponent = (props: SelectPropsWithBox) => ReactNode;

const Select: SelectComponent = forwardRef(
	({ children, defaultValue, onValueChange, ...restProps }, ref?) => {
		const valueProps = {
			defaultValue,
			onValueChange,
		};

		return (
			<SelectProvider valueProps={valueProps}>
				<Box as='div' ref={ref} {...restProps}>
					{children}
				</Box>
			</SelectProvider>
		);
	},
);

const SelectCompound = Object.assign(Select, {
	Trigger: SelectTrigger,
	Menu: SelectMenu,
	Item: SelectItem,
	Label: SelectLabel,
});
export { SelectCompound as Select };
