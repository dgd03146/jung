import { type HTMLAttributes, forwardRef } from 'react';
import { Box, type BoxProps } from '..';

type Text = 'span' | 'p';

interface TextProps
	extends HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
	text?: string;
	as?: Text;
}

type TextPropsWithBox = BoxProps<Text, TextProps>;

type TextComponent = (props: TextPropsWithBox) => React.ReactNode;

export const Text: TextComponent = forwardRef(
	({ as, text, children, ...restProps }, ref?) => {
		return (
			<Box as={as || 'p'} ref={ref} {...restProps}>
				{text}
				{children}
			</Box>
		);
	},
);
