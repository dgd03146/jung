import type { InputProps } from '@jung/design-system';

type Variant = NonNullable<InputProps['variant']>;
export const variantOptions: Variant[] = ['primary', 'ghost'];

type Size = NonNullable<InputProps['size']>;
export const sizeOptions: Size[] = ['sm', 'md', 'lg'];
