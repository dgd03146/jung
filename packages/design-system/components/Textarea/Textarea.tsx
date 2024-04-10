import { type ReactNode, type TextareaHTMLAttributes, forwardRef } from "react";
import { Box, type BoxProps } from "..";
import * as styles from "./Textarea.css";

interface Props
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	variant?: "primary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	rounded?: boolean;
}

type TextareaProps = BoxProps<"input", Props>;
type TextareaComponent = (props: TextareaProps) => ReactNode;

export const Textarea: TextareaComponent = forwardRef(
	({ className, variant, size, rows, cols, rounded, ...restProps }, ref?) => {
		const textAreaStyle = styles.textarea({ variant, size, rounded });

		return (
			<Box
				as="textarea"
				className={textAreaStyle}
				cols={cols || 30}
				rows={rows || 5}
				ref={ref}
				{...restProps}
			/>
		);
	},
);
