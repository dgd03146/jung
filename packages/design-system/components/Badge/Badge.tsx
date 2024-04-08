import { badge } from "./Badge.css";

import {
	type ButtonHTMLAttributes,
	type PropsWithChildren,
	forwardRef,
} from "react";

import { Box, type BoxProps } from "..";

interface Props
	extends PropsWithChildren<
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">
	> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	rounded?: boolean;
}

type BadgeProps = BoxProps<"div", Props>;
type BadgeComponent = (props: BadgeProps) => React.ReactNode;

export const Badge: BadgeComponent = forwardRef(
	({ variant, size, rounded, children, ...restProps }, ref?) => {
		const badgeClass = badge({ variant, size, rounded });

		return (
			<Box
				as="div"
				display="inline-block"
				className={badgeClass}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
