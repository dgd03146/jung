import { type HTMLAttributes, forwardRef } from 'react';

import { Box, type BoxProps } from '..';
import * as styles from './Card.css';
import { CardBody } from './CardBody';
import { CardContent } from './CardContent';
import { CardDate } from './CardDate';
import { CardDescription } from './CardDescription';
import { CardFooter } from './CardFooter';
import { CardMedia } from './CardMedia';
import { CardProvider } from './CardProvider';
import { CardTags } from './CardTags';
import { CardTitle } from './CardTitle';
import type { Item } from './types/card';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	item: Item;
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'base' | 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

type CardWithBoxProps = BoxProps<'div', CardProps>;
type CardComponent = (props: CardWithBoxProps) => React.ReactNode;

const Card: CardComponent = forwardRef(
	({ item, children, variant, size, rounded, ...restProps }, ref?) => {
		const cardStyle = styles.card({ variant, size, rounded });

		return (
			<CardProvider item={item}>
				<Box as='div' className={cardStyle} ref={ref} {...restProps}>
					{children}
				</Box>
			</CardProvider>
		);
	},
);

const CardCompound = Object.assign(Card, {
	Content: CardContent,
	Body: CardBody,
	Footer: CardFooter,
	Media: CardMedia,
	Title: CardTitle,
	Description: CardDescription,
	Date: CardDate,
	Tags: CardTags,
});
export { CardCompound as Card };
