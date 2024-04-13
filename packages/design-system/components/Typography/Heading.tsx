import * as styles from './Heading.css';

import { forwardRef } from 'react';
import { Box, type BoxProps } from '..';

type Heading = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
	text?: string;

	as?: Heading;
}

type HeadingPropsWithBox = BoxProps<Heading, HeadingProps>;

type HeadingComponent = (props: HeadingPropsWithBox) => React.ReactNode;

export const Heading: HeadingComponent = forwardRef(
	({ as, text, children, ...restProps }, ref?) => {
		const headingStyle = styles.heading({ as });

		return (
			<Box as={as || 'h1'} className={headingStyle} ref={ref} {...restProps}>
				{text}
				{children}
			</Box>
		);
	},
);
