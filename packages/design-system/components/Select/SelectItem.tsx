import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Box, type BoxProps, ListItem, type ListItemComponent } from "..";

import {
	type LiHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from "react";
import { palette } from "../../tokens/palette";
import { CheckIcon } from "../Icons/CheckIcon";
import * as styles from "./SelectItem.css";
import { useSelectContext } from "./SelectProvider";

interface Props extends PropsWithChildren<LiHTMLAttributes<HTMLLIElement>> {}

// FIXME: 어떻게 List 컴포넌트를 활용할 수 있을까?

type ListProps = BoxProps<"li", Props>;
export type ListComponent = (props: ListProps) => ReactNode;

export const SelectItem: ListItemComponent = forwardRef(
	({ children, id, value, ...restProps }, ref?) => {
		const { onValueChange, setValue } = useSelectContext();

		const selectedOption = { label: "Option3", value: "option3" };
		// type Option |null ex) { label: 'Option3', value: 'option3' }

		return (
			<Box
				as="li"
				role="option"
				display="flex"
				columnGap="1"
				aria-selected={value === selectedOption.value}
				color="white"
				paddingX="2.5"
				paddingY="1.5"
				fontSize="sm"
				minWidth="40"
				className={styles.li}
				cursor="pointer"
				id={id}
				value={value}
				ref={ref}
				style={assignInlineVars({
					[styles.focusedColor]:
						value === selectedOption.value
							? palette.primary
							: palette.primary100,
				})}
				{...restProps}
				onClick={() => {}}
			>
				{value === selectedOption.value && <CheckIcon />}
				{children}
			</Box>
		);
	},
);
