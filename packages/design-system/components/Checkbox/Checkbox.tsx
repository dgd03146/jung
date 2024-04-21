import {
	type ChangeEvent,
	type HTMLAttributes,
	type ReactNode,
	forwardRef,
	useId,
} from 'react';

import { Box, type BoxProps, Text } from '..';
import { CheckIcon } from '../../icons';
import * as styles from './Checkbox.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

type CheckboxProps = BoxProps<'div', Props>;
type CheckboxComponent = (props: CheckboxProps) => ReactNode;

export const Checkbox: CheckboxComponent = forwardRef(
	({ children, disabled, checked, onChange, ...restProps }, ref?) => {
		const checkBoxId = useId();

		const iconWrapperStyle = styles.iconWrapper({ checked });
		const labelStyle = styles.label({ disabled });
		return (
			<Box as='div' display='inline-block'>
				<Box
					as='label'
					className={labelStyle}
					ref={ref}
					{...restProps}
					htmlFor={checkBoxId}
				>
					<Box
						as='input'
						className={styles.input}
						type='checkbox'
						id={checkBoxId}
						data-testid='checkbox'
						disabled={disabled}
						checked={checked}
						onChange={onChange}
					/>
					<Box className={iconWrapperStyle}>{checked && <CheckIcon />}</Box>
					<Text as='span' color={disabled ? 'gray400' : 'black'}>
						{children}
					</Text>
				</Box>
			</Box>
		);
	},
);
