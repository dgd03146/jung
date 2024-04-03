import * as styles from "./Button.css";

import {
	type ButtonHTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
	forwardRef,
} from "react";

import { Box, type BoxProps } from "..";

interface Props
	extends PropsWithChildren,
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "rounded";
	prefix?: ReactNode;
	suffix?: ReactNode;
	right?: ReactNode;
}

type ButtonProps = BoxProps<"button", Props>;
type ButtonComponent = (props: ButtonProps) => React.ReactNode;

export const Button: ButtonComponent = forwardRef(
	({ variant = "primary", prefix, suffix, children, ...restProps }, ref?) => {
		const buttonClass = styles.button({ variant });

		return (
			<Box
				as="button"
				display="flex"
				alignItems="center"
				columnGap="1"
				className={buttonClass}
				ref={ref}
				{...restProps}
			>
				{prefix}
				{children}
				{suffix}
			</Box>
		);
	},
);
