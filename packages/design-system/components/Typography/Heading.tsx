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
 * - level `5`: Title 2
 */

export interface HeadingProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3 | 4 | 5;
	truncate?: 'none' | 'single' | 'two' | 'three';
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	variant?: 'hero';
	className?: string;
	children: React.ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
	(
		{ level = 1, as, children, className, variant, truncate, ...restProps },
		ref,
	) => {
		const headingTag = as || (`h${Math.min(level, 5)}` as ElementType);

		const headingStyle = clsx(
			S.heading({ level, variant, truncate }),
			className,
		);

		return (
			<Box as={headingTag} ref={ref} className={headingStyle} {...restProps}>
				{children}
			</Box>
		);
	},
);
