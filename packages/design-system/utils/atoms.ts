import omit from 'lodash/omit';
import pick from 'lodash/pick';

import { type Sprinkles, elementResets, sprinkles } from '../styles';

import clsx, { type ClassValue } from 'clsx';

export interface Atoms extends Sprinkles {
	reset?: keyof JSX.IntrinsicElements;
	className?: ClassValue;
}

/**
 * Extracts Sprinkles props from the given props object.
 * @param props - The props object.
 * @returns An array containing the Sprinkles props and the remaining props.
 *
 * The `pick` function is used to extract the Sprinkles props from the `props` object.
 * The `keys` variable contains an array of all the property keys defined in the `sprinkles` object.
 * The `omit` function is used to extract the remaining props that are not Sprinkles props.
 * The function returns an array with two elements: the Sprinkles props and the remaining props.
 */

const keys = Array.from(sprinkles.properties.keys());
export const extractAtoms = <P extends object>(props: P) => [
	pick(props, keys),
	omit(props, keys),
];

/**
 * Generates a class name string based on the provided Atoms object.
 * @param atoms - The Atoms object containing style properties.
 * @returns The generated class name string.
 *
 * The function destructures the `atoms` object into `reset`, `className`, and the remaining `rest` properties.
 * The `sprinkles` function is used to generate the class names for the `rest` properties.
 * The `clsx` library is used to combine the generated `sprinklesClassNames`, the `className` property, and the `reset` class name (if provided).
 * The final class name string is returned, which can be used to apply styles to a component.
 */

function generateClassNames(atoms: Atoms) {
	const { reset, className, ...rest } = atoms;
	const sprinklesClassNames = sprinkles(rest);
	return clsx(
		sprinklesClassNames,
		className,
		reset ? [elementResets[reset]] : null,
	);
}

/**
 * A utility function that generates a class name string based on the provided Atoms object.
 * @param atoms - The Atoms object containing style properties.
 * @returns The generated class name string.
 */

export function atoms(atoms: Atoms) {
	return generateClassNames(atoms);
}
