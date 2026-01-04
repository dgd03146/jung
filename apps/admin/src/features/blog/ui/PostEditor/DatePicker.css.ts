import { globalStyle, style } from '@vanilla-extract/css';

export const inputWrapper = style({
	position: 'relative',
	width: '100%',
});

export const input = style({
	width: '100%',
	height: '40px',
	padding: '0 12px',
	paddingRight: '36px',
	// border: '1px solid #E2E8F0',
	borderRadius: '8px',
	fontSize: '14px',
	color: '#334155',
	backgroundColor: 'white',
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		borderColor: '#0142C0',
		backgroundColor: '#F8FAFC',
	},

	':focus': {
		outline: 'none',
		borderColor: '#0142C0',
		boxShadow: '0 0 0 2px rgba(1, 66, 192, 0.08)',
	},
});

export const calendarIcon = style({
	position: 'absolute',
	right: '12px',
	top: '50%',
	transform: 'translateY(-50%)',
	color: '#64748B',
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
	color: '#334155',
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
	color: '#64748B',
	cursor: 'pointer',
	transition: 'all 0.15s ease',

	':hover': {
		backgroundColor: '#F1F5F9',
		color: '#0142C0',
	},

	':disabled': {
		color: '#CBD5E1',
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

	borderBottom: '1px solid #E2E8F0',
});

globalStyle('.react-datepicker__day-name', {
	margin: '0',
	color: '#0142C0',
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
	color: '#334155',
	fontSize: '14px',
	fontWeight: '500',
	transition: 'all 0.15s ease',
});

globalStyle('.react-datepicker__day:hover', {
	backgroundColor: '#EEF2FF',
	color: '#0142C0',
});

globalStyle('.react-datepicker__day--selected', {
	backgroundColor: '#0142C0',
	color: 'white',
	fontWeight: '600',
});

globalStyle('.react-datepicker__day--selected:hover', {
	backgroundColor: '#0039B3',
	color: 'white',
});

globalStyle('.react-datepicker__day--keyboard-selected', {
	backgroundColor: '#F8FAFF',
	color: '#0142C0',
});

globalStyle('.react-datepicker__day--keyboard-selected', {
	backgroundColor: 'transparent',
	color: '#0142C0',
});

globalStyle('.react-datepicker__day--outside-month', {
	color: '#CBD5E1',
	fontWeight: '400',
});

globalStyle('.react-datepicker-popper', {
	zIndex: 2,
});
