import { palette } from '@jung/design-system/tokens';
import { globalStyle, style } from '@vanilla-extract/css';

const bodyText = 'rgba(0, 0, 0, 0.8)';
const mutedText = 'rgba(0, 0, 0, 0.45)';
const border = 'rgba(0, 0, 0, 0.06)';
const hoverBg = 'rgba(0, 0, 0, 0.02)';
const disabledText = 'rgba(0, 0, 0, 0.25)';
const primaryTint = 'rgba(1, 66, 192, 0.06)';

export const inputWrapper = style({
	position: 'relative',
	width: '100%',
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	paddingRight: '36px',
	borderRadius: '8px',
	fontSize: '14px',
	color: bodyText,
	backgroundColor: 'white',
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		borderColor: palette.primary,
		backgroundColor: hoverBg,
	},

	':focus': {
		outline: 'none',
		borderColor: palette.primary,
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},
});

export const calendarIcon = style({
	position: 'absolute',
	right: '12px',
	top: '50%',
	transform: 'translateY(-50%)',
	color: mutedText,
	width: '16px',
	height: '16px',
	pointerEvents: 'none',
});

export const headerWrapper = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 8px',
});

export const currentMonth = style({
	fontSize: '15px',
	fontWeight: '600',
	color: bodyText,
});

export const navButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '28px',
	height: '28px',
	padding: '0',
	border: 'none',
	borderRadius: '6px',
	backgroundColor: 'transparent',
	color: mutedText,
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		backgroundColor: border,
		color: palette.primary,
	},

	':disabled': {
		color: disabledText,
		cursor: 'not-allowed',
	},
});

export const container = style({
	position: 'relative',
	width: '100%',
});

export const wrapper = style({
	width: '100%',
});

export const calendar = style({
	width: '240px !important',
});

globalStyle('.react-datepicker', {
	fontFamily: 'inherit',
	fontSize: '14px',
	border: 'none',
	borderRadius: '12px',
	boxShadow:
		'rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px',
	padding: '8px',
	background: 'white',
	width: '280px',
});

globalStyle('.react-datepicker__header', {
	background: 'white',
	borderBottom: 'none',
	padding: '0',
	margin: '0 0 12px 0',
});

globalStyle('.react-datepicker__month', {
	margin: '0',
	padding: '0 8px',
});

globalStyle('.react-datepicker__month-container', {
	float: 'none',
});

globalStyle('.react-datepicker__day-names', {
	display: 'flex',
	justifyContent: 'space-between',
	margin: '0',
	padding: '8px',

	borderBottom: `1px solid ${border}`,
});

globalStyle('.react-datepicker__day-name', {
	margin: '0',
	color: palette.primary,
	width: '36px',
	fontSize: '13px',
	fontWeight: '600',
	textTransform: 'uppercase',
});

globalStyle('.react-datepicker__week', {
	display: 'flex',
	justifyContent: 'space-between',
	margin: '2px 0',
});

globalStyle('.react-datepicker__day', {
	margin: '0',
	width: '36px',
	height: '36px',
	lineHeight: '36px',
	borderRadius: '8px',
	color: bodyText,
	fontSize: '14px',
	fontWeight: '500',
	transition: 'all 0.15s ease',
});

globalStyle('.react-datepicker__day:hover', {
	backgroundColor: primaryTint,
	color: palette.primary,
});

globalStyle('.react-datepicker__day--selected', {
	backgroundColor: palette.primary,
	color: 'white',
	fontWeight: '600',
});

globalStyle('.react-datepicker__day--selected:hover', {
	backgroundColor: palette.primary200,
	color: 'white',
});

globalStyle('.react-datepicker__day--keyboard-selected', {
	backgroundColor: 'transparent',
	color: palette.primary,
});

globalStyle('.react-datepicker__day--outside-month', {
	color: disabledText,
	fontWeight: '400',
});

globalStyle('.react-datepicker-popper', {
	zIndex: 2,
});
