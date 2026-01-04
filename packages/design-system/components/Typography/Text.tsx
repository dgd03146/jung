import clsx from 'clsx';
import { forwardRef, type ParamHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';
import { Box } from '..';
import * as S from './Typography.css';

type TextElement = 'p' | 'span' | 'label' | 'time';

/**
 * Typography Body Text
 * @param {number} level - Body text level value
 * - level `1`: Body text 1
 * - level `2`: Body text 2
 * - level `3`: Body text 3
 * - level `4`: Body text 4
 */

export interface TextProps
	extends Omit<ParamHTMLAttributes<HTMLElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3 | 4;
	inline?: boolean;
	truncate?: 'none' | 'single' | 'two' | 'three';
	as?: TextElement;
}

export const Text = forwardRef<HTMLElement, TextProps>(
	(
		{
			level = 2,
			inline,
			truncate,
			children,
			className,
			as = 'p',
			...restProps
		},
		ref,
	) => {
		const textStyle = clsx(S.text({ level, inline, truncate }), className);

		return (
			<Box as={as} className={textStyle} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
