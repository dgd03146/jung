import {
	fontSizes,
	fontWeights,
	palette,
	space,
} from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: `${space['12']} ${space['6']}`,
	gap: space['4'],
	borderRadius: space['3'],
	border: `1px dashed ${palette.gray}`,
	backgroundColor: palette.white100,
});

export const icon = style({
	color: palette.gray200,
	marginBottom: space['1'],
});

export const title = style({
	fontSize: fontSizes.base,
	fontWeight: fontWeights.semibold,
	color: palette.gray300,
	margin: 0,
});

export const description = style({
	fontSize: fontSizes.sm,
	color: palette.gray200,
	margin: 0,
});
