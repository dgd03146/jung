import { elementResets, sprinkles } from '../styles';

import clsx from 'clsx';

import type { Atoms } from '../types/atoms';

/**

 * The `pick` function is used to extract the Sprinkles props from the `props` object.
 * The `keys` variable contains an array of all the property keys defined in the `sprinkles` object.
 * The `omit` function is used to extract the remaining props that are not Sprinkles props.
 * The function returns an array with two elements: the Sprinkles props and the remaining props.
 */

function pick<T extends object>(
	obj: T,
	keys: string[],
): Record<string, unknown> {
	const result: Record<string, unknown> = {};

	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key as keyof T];
		}
	}

	return result;
}
function omit<T extends object>(obj: T, keys: string[]): Partial<T> {
	const result = { ...obj };

	for (const key of keys) {
		if (key in result) {
			delete result[key as keyof typeof result];
		}
	}

	return result;
}

const keys = Array.from(sprinkles.properties.keys());

export const extractAtoms = <P extends object>(props: P) => {
	const atomProps = pick(props, keys);
	const otherProps = omit(props, keys);

	return [atomProps, otherProps] as const;
};

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
