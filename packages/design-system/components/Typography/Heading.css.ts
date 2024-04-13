import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles.css';

export const heading = recipe({
	base: sprinkles({
		fontWeight: 'bold',
		display: 'block',
		margin: '0',
	}),
	variants: {
		as: {
			h1: sprinkles({
				fontSize: '5xl', // 48px
				lineHeight: '14',
			}),

			h2: sprinkles({
				fontSize: '3xl', // 32px
				lineHeight: '10',
			}),
			h3: sprinkles({
				fontSize: '2xl', // 24px
				lineHeight: '8',
			}),
			h4: sprinkles({
				fontSize: 'xl', // 20px
				fontWeight: 'semibold',
			}),
		},
	},
	defaultVariants: {
		as: 'h1',
	},
});
