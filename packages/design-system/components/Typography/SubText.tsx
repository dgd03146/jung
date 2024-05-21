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
 * - level `4`: SubText 4
 */
export interface SubTextProps
	extends Omit<ParamHTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3 | 4;
	inline?: boolean;
}

export const SubText = forwardRef<HTMLParagraphElement, SubTextProps>(
	({ level = 1, inline, children, ...restProps }, ref) => {
		return (
			<Box
				as='p'
				className={S.subText({ level, inline })}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
