import type { TextareaProps } from '@jung/design-system';

type Variant = NonNullable<TextareaProps['variant']>;
export const variantOptions: Variant[] = ['primary', 'secondary', 'ghost'];

type Size = NonNullable<TextareaProps['size']>;
export const sizeOptions: Size[] = ['sm', 'md', 'lg'];
