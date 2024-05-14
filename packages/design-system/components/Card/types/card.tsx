// TODO: Need to move shared workspace

import type { HTMLAttributes } from 'react';
import type { AtomProps } from '../../../types/atoms';

export type Item = {
	// image: {
	//   src: string;
	//   width: string;
	//   height: string;
	//   alt: string;
	// };
	title: string;
	description: string;
	date: Date;
	tags: Array<string>;
};

export interface CardProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
		AtomProps {}
