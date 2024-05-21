import type { ButtonProps } from '@jung/design-system';

type Variant = NonNullable<ButtonProps['variant']>;
export const variantOptions: Variant[] = ['primary', 'secondary', 'ghost'];

type Size = NonNullable<ButtonProps['size']>;
export const sizeOptions: Size[] = ['sm', 'md', 'lg'];
