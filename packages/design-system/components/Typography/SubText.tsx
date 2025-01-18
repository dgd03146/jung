import clsx from 'clsx';
import { type ParamHTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Typography.css';

/**
 * Typography SubText
 * @param {number} SubText - SubText level value
 * - level `1`: SubText 1
 * - level `2`: SubText 2
 * - level `3`: SubText 3
 
 */
export interface SubTextProps
	extends Omit<ParamHTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3;
	inline?: boolean;
	truncate?: 'none' | 'single' | 'two' | 'three';
}

export const SubText = forwardRef<HTMLParagraphElement, SubTextProps>(
	({ level = 1, inline, truncate, children, className, ...restProps }, ref) => {
		const subTextStyle = clsx(
			S.subText({ level, inline, truncate }),
			className,
		);
		return (
			<Box as='p' className={subTextStyle} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
