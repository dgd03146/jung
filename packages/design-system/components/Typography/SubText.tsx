import clsx from 'clsx';
import { forwardRef, type ParamHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as S from './Typography.css';

type SubTextElement = 'p' | 'span' | 'label' | 'time';

/**
 * Typography SubText
 * @param {number} SubText - SubText level value
 * - level `1`: SubText 1
 * - level `2`: SubText 2
 * - level `3`: SubText 3
 
 */
export interface SubTextProps
	extends Omit<ParamHTMLAttributes<HTMLElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3;
	inline?: boolean;
	truncate?: 'none' | 'single' | 'two' | 'three';
	as?: SubTextElement;
}

export const SubText = forwardRef<HTMLElement, SubTextProps>(
	(
		{
			level = 1,
			inline,
			truncate,
			children,
			className,
			as = 'p',
			...restProps
		},
		ref,
	) => {
		const subTextStyle = clsx(
			S.subText({ level, inline, truncate }),
			className,
		);
		return (
			<Box as={as} className={subTextStyle} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
