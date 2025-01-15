import { type ElementType, type HTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import * as S from './Typography.css';

import clsx from 'clsx';
import type { AtomProps } from '../../types/atoms';

/**
 * Typography Heading
 * @param {number} level - Heading level value
 * - level `1`: Display 1
 * - level `2`: Heading 1, Heading 2
 * - level `3`: SubHeading 1, SubHeading 2
 * - level `4`: Title 1
 */

export interface HeadingProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3 | 4;
	variant?: 'hero';
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ level = 1, children, className, variant, ...restProps }, ref) => {
		const as = `h${level}` as ElementType;

		const headingStyle = clsx(S.heading({ level, variant }), className);

		return (
			<Box as={as} ref={ref} className={headingStyle} {...restProps}>
				{children}
			</Box>
		);
	},
);
