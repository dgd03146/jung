"use client";

import {
	type PropsWithChildren,
	type ReactNode,
	type SelectHTMLAttributes,
	forwardRef,
	useState,
} from "react";
import { Box, type BoxProps } from "..";
import { SelectItem } from "./SelectItem";
import { SelectLabel } from "./SelectLabel";
import { SelectMenu } from "./SelectMenu";
import SelectProvider from "./SelectProvider";
import { SelectTrigger } from "./SelectTrigger";

// FIXME: Provider랑 같이 중복으로 사용됨
// TODO: options 제네릭으로 해야 여러가지 데이터 받을 수 있음?
// FIXME: Provider 굳이 div태그로 안 감싸도 괜찮은듯?

type Props = {
	onValueChange?: (value: string) => void;
	defaultValue?: string;
};

type SelectElementProps = PropsWithChildren<
	SelectHTMLAttributes<HTMLSelectElement>
>;
type SelectProps = SelectElementProps & Props;
type SelectPropsWithBox = BoxProps<"select", SelectProps>;
type SelectComponent = (props: SelectPropsWithBox) => ReactNode;

const Select: SelectComponent = forwardRef(
	({ children, defaultValue, onValueChange, ...restProps }, ref?) => {
		// TODO: value
		const [value, setValue] = useState("");
		const [open, setOpen] = useState(false);
		const valueProps = {
			onValueChange,
			open,
			setOpen,
			defaultValue,
			value,
			setValue,
		};

		return (
			<SelectProvider valueProps={valueProps}>
				<Box as="div" ref={ref} {...restProps}>
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
