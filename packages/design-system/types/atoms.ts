import type { Atoms } from '../utils/atoms';

export type OmitAtomProps<Props extends PropertyKey = never> = Omit<
	Atoms,
	'className' | 'color' | Props
>;
