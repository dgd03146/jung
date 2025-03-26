import { elementResets, sprinkles } from '../styles';

import clsx from 'clsx';

import type { Atoms } from '../types/atoms';

const keys = Array.from(sprinkles.properties.keys());

const AtomKeys = typeof keys;

/**

 * The `pick` function is used to extract the Sprinkles props from the `props` object.
 * The `keys` variable contains an array of all the property keys defined in the `sprinkles` object.
 * The `omit` function is used to extract the remaining props that are not Sprinkles props.
 * The function returns an array with two elements: the Sprinkles props and the remaining props.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function pick<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	keys: readonly K[],
): Pick<T, K> {
	const result = {} as Pick<T, K>;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = obj[key];
		}
	}

	return result;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function omit<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	keys: readonly K[],
): Omit<T, K> {
	const result = { ...obj };

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		delete result[key];
	}

	return result as Omit<T, K>;
}

export const extractAtoms = <P extends object>(props: P) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const atomProps = pick(props, keys as any);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const otherProps = omit(props, keys as any);

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

/**
 * A utility function that generates a class name string based on the provided Atoms object.
 * @param atoms - The Atoms object containing style properties.
 * @returns The generated class name string.
 */

export function atoms(atoms: Atoms) {
	const { reset, className, ...rest } = atoms;
	const sprinklesClassNames = sprinkles(rest);

	return clsx(
		sprinklesClassNames,
		className,
		reset ? [elementResets[reset]] : null,
	);
}
