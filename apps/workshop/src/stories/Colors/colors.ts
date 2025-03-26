import { palette } from '@jung/design-system/tokens';

export const colors = [
	{
		title: 'Primary',
		colors: [
			{ name: 'primary', colorCode: palette.primary },
			{ name: 'primary100', colorCode: palette.primary100 },
			{ name: 'primary200', colorCode: palette.primary200 },
			{ name: 'primary300', colorCode: palette.primary300 },
			{ name: 'primary400', colorCode: palette.primary400 },
		],
	},
	{
		title: 'Secondary',
		colors: [
			{ name: 'secondary', colorCode: palette.secondary },
			{ name: 'secondary100', colorCode: palette.secondary100 },
			{ name: 'secondary200', colorCode: palette.secondary200 },
			{ name: 'secondary300', colorCode: palette.secondary300 },
		],
	},
	{
		title: 'Neutral',
		colors: [
			{ name: 'black', colorCode: palette.black },
			{ name: 'white', colorCode: palette.white },
			{ name: 'white100', colorCode: palette.white100 },
			{ name: 'white200', colorCode: palette.white200 },
			{ name: 'gray', colorCode: palette.gray },
			{ name: 'gray100', colorCode: palette.gray100 },
			{ name: 'gray300', colorCode: palette.gray300 },
		],
	},

	{
		title: 'Success and Error',
		colors: [
			{ name: 'success', colorCode: palette.success },
			{ name: 'error', colorCode: palette.error },
		],
	},
] as const;
