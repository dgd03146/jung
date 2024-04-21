import * as styles from './Spinner.css';

import { type HTMLAttributes, forwardRef } from 'react';
import { Box, type BoxProps } from '..';
import { palette } from '../../tokens';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
	size?: number;
	sw?: number;
	// svgProps?: SVGProps<SVGSVGElement>;
}

type SpinnerProps = BoxProps<'svg', Props>;
type SpinnerComponent = (props: SpinnerProps) => React.ReactNode;

export const Spinner: SpinnerComponent = forwardRef(
	({ size = 6, sw = 1, color, ...restProps }, ref) => {
		return (
			<Box
				as='svg'
				width={size}
				height={size}
				x={size}
				y={size}
				viewBox={`0 0 ${size} ${size}`}
				ref={ref}
				{...restProps}
			>
				<circle
					className={styles.circle}
					cx={size / 2}
					cy={size / 2}
					r={(size - sw) / 2}
					fill='none'
					stroke={color || palette.primary200}
					stroke-width={sw}
				/>
			</Box>
		);
	},
);
