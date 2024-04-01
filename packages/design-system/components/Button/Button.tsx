// import * as styles from './Button.css';

// import {
//   type ButtonHTMLAttributes,
//   type PropsWithChildren,
//   type ReactNode,
//   forwardRef,
// } from 'react';

// import { Box, type BoxProps } from '..';
// import Link from 'next/link';
// import type { PolymorphicRef } from '@/types/polymorhpic';

import { type } from "../index";

// interface Props
//   extends PropsWithChildren,
//     ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'solid';
//   text?: string;
//   icon?: ReactNode;
//   href?: string;
// }

// type ButtonProps = BoxProps<'button', Props>;
// type ButtonComponent = (props: ButtonProps) => React.ReactNode | null;

// export const Button: ButtonComponent = forwardRef(
//   (
//     {
//       href,
//       variant = 'basic',
//       icon,
//       text,
//       children,
//       ref,
//       ...restProps
//     }: ButtonProps,
//     // ref?: PolymorphicRef<'button'>,
//   ) => {
//     const buttonClass = styles.buttonStyle({ variant });

//     const content = (
//       <>
//         {children}
//         {text}
//         {icon && (
//           <Box display="inline" paddingLeft="xsmall">
//             {icon}
//           </Box>
//         )}
//       </>
//     );

//     return href ? (
//       <Link href={href} className={buttonClass}>
//         {content}
//       </Link>
//     ) : (
//       <Box as="button" className={buttonClass} ref={ref} {...restProps}>
//         {content}
//       </Box>
//     );
//   },
// );

export const Button = () => {
	return <button type="button">hihi</button>;
};
