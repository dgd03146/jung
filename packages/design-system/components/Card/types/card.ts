import type { HTMLAttributes } from 'react';
import type { AtomProps } from '../../../types/atoms';

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {}
