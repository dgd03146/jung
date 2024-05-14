import { forwardRef } from 'react';

import { Box } from '..';
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
import type { CardProps, Item } from './types/card';

interface Props extends CardProps {
	item: Item;
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'base' | 'sm' | 'md' | 'lg';
	rounded?: boolean;
}

const Card = forwardRef<HTMLDivElement, Props>(
	({ item, children, variant, size, rounded, ...restProps }, ref) => {
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
