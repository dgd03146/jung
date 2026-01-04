import { forwardRef, type LiHTMLAttributes } from 'react';
import type { AtomProps } from '../../types/atoms';

import { Box } from '..';
import { useTabHandler } from './hooks/useTabHandle';
import * as S from './TabsTrigger.css';

export interface TabsTriggerProps
	extends Omit<LiHTMLAttributes<HTMLLIElement>, 'color'>,
		AtomProps {
	value: string | number;
	onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export const TabsTrigger = forwardRef<HTMLLIElement, TabsTriggerProps>(
	({ children, value, onClick, ...restProps }, ref?) => {
		const { isActive, variant, rounded, handleTabClick } = useTabHandler(value);

		const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
			handleTabClick();
			onClick?.(e);
		};

		return (
			<Box
				as='li'
				role='tab'
				aria-selected={isActive}
				className={S.trigger({ isActive, variant, rounded })}
				{...restProps}
				ref={ref}
				onClick={handleClick}
			>
				<Box className={S.tab({ isActive, variant })}>{children}</Box>
			</Box>
		);
	},
);
