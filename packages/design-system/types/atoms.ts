import type { ClassValue } from 'clsx';
import type { Sprinkles } from '../styles/index';

/**
 * Extracts Sprinkles props from the given props object.
 * @param props - The props object.
 * @returns An array containing the Sprinkles props and the remaining props.
 */

export interface Atoms extends Sprinkles {
	reset?: keyof JSX.IntrinsicElements;
	className?: ClassValue;
}

export type AtomProps = Omit<Atoms, 'className' | 'reset'>;

export type OmitProps = 'prefix' | 'color';
