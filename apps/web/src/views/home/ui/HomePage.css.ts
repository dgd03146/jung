import { sprinkles } from '@jung/design-system/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

const HEADER_HEIGHT = 72; // 헤더 높이
const FOOTER_HEIGHT = 72; // 푸터 높이
const MAIN_MARGIN = {
	mobile: 32,
	tablet: 64,
	laptop: 80,
};

const SUBSECTION_MARGIN = HEADER_HEIGHT + FOOTER_HEIGHT + MAIN_MARGIN.laptop;

export const container = style([
	sprinkles({
		paddingY: {
			mobile: '8',
			tablet: '12',
			laptop: '16',
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		minHeight: calc.subtract('100dvh', `${SUBSECTION_MARGIN}px`),
	},
]);
