import * as S from './Tooltip.css';

import {
	type HTMLAttributes,
	type ReactNode,
	forwardRef,
	useId,
	useRef,
} from 'react';

import { useViewportSize } from '@jung/shared/hooks';
import { Box, Typography } from '..';
import { ArrowDropDownIcon, ArrowDrouUpIcon } from '../../icons';
import { CloseIcon } from '../../icons/CloseIcon';
import type { AtomProps } from '../../types/atoms';
import { useTooltip } from './hooks/useTooltip';
import { useTooltipPosition } from './hooks/useTooltipPostion';

export interface TooltipProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'content'>,
		Omit<AtomProps, 'left'> {
	placement?: 'left' | 'center' | 'right';
	variant?: 'primary' | 'secondary';
	size?: 'sm' | 'md';
	close?: boolean;
	left?: ReactNode;
	content: ReactNode;
	tooltipId: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(
		{
			tooltipId,
			children,
			className,
			variant = 'primary',
			size = 'md',
			placement = 'center',
			close,
			content,
			left,
			...props
		},
		ref?,
	) => {
		const { viewportSize } = useViewportSize();

		const wrapperRef = useRef<HTMLDivElement>(null);
		const tooltipRef = useRef<HTMLDivElement>(null);
		const arrowRef = useRef<HTMLDivElement>(null);
		const { isVisible, handleClose } = useTooltip(tooltipId);

		const { isInViewport } = useTooltipPosition({
			isVisible,
			placement,
			viewportSize,
			refs: {
				wrapperRef,
				tooltipRef,
				arrowRef,
			},
		});

		const tooltipAreaId = useId();

		return (
			<Box
				{...props}
				ref={wrapperRef || ref}
				aria-describedby={tooltipAreaId}
				className={S.wrapper}
			>
				{children}
				<div ref={arrowRef} className={S.tooltipArrow({ variant, isVisible })}>
					{isInViewport ? <ArrowDropDownIcon /> : <ArrowDrouUpIcon />}
				</div>
				<div
					ref={tooltipRef}
					className={S.tooltip({ variant, size, isVisible })}
					id={tooltipAreaId}
					role='tooltip'
					aria-hidden={isVisible}
					onClick={(e) => e.stopPropagation()}
				>
					{left && left}
					<Typography.FootNote level={3}>{content}</Typography.FootNote>
					{close && (
						<Box
							as='button'
							cursor='pointer'
							background='transparent'
							type='button'
							aria-label='close'
							display='flex'
							alignItems='center'
							className={S.closeButton({ variant })}
							onClick={handleClose}
						>
							<CloseIcon />
						</Box>
					)}
				</div>
			</Box>
		);
	},
);
