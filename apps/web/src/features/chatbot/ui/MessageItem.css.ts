import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
	'0%': { opacity: 0, transform: 'translateY(4px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

export const messageWrapper = style({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	gap: '10px',
	maxWidth: '85%',
	animation: `${fadeIn} 0.2s ease-out`,
});

export const userMessage = style([
	messageWrapper,
	{
		alignSelf: 'flex-end',
		flexDirection: 'row-reverse',
	},
]);

export const assistantMessage = style([
	messageWrapper,
	{
		alignSelf: 'flex-start',
	},
]);

export const avatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	color: '#fff',
	fontSize: '14px',
});

export const userAvatar = style({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	backgroundColor: '#fff',
	border: '1.5px solid rgba(77, 102, 229, 0.25)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	color: '#4D66E5',
	boxShadow: '0 2px 6px rgba(77, 102, 229, 0.1)',
});

export const bubble = style({
	padding: '10px 14px',
	borderRadius: '16px',
	fontSize: '14px',
	lineHeight: 1.5,
	wordBreak: 'break-word',
});

export const userBubble = style([
	bubble,
	{
		background: 'linear-gradient(135deg, #4D66E5 0%, #3B5BD9 100%)',
		color: '#fff',
		borderBottomRightRadius: '4px',
	},
]);

export const assistantBubble = style([
	bubble,
	{
		backgroundColor: 'rgba(255, 255, 255, 0.85)',
		color: '#1F2937',
		borderBottomLeftRadius: '4px',
		border: '1px solid rgba(77, 102, 229, 0.1)',
		backdropFilter: 'blur(8px)',
	},
]);

const blink = keyframes({
	'0%, 100%': { opacity: 0.4 },
	'50%': { opacity: 1 },
});

export const loadingDots = style({
	display: 'flex',
	gap: '5px',
	padding: '4px 0',
	alignItems: 'center',
});

export const dot = style({
	width: '6px',
	height: '6px',
	borderRadius: '50%',
	backgroundColor: '#4D66E5',
	animation: `${blink} 1.4s infinite both`,

	selectors: {
		'&:nth-child(1)': {
			animationDelay: '0s',
		},
		'&:nth-child(2)': {
			animationDelay: '0.2s',
		},
		'&:nth-child(3)': {
			animationDelay: '0.4s',
		},
	},
});

const pulse = keyframes({
	'0%, 100%': { opacity: 0.4 },
	'50%': { opacity: 1 },
});

export const toolSearching = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	marginTop: '8px',
	padding: '8px 12px',
	fontSize: '13px',
	color: '#6B7280',
	backgroundColor: 'rgba(77, 102, 229, 0.04)',
	borderRadius: '8px',
	animation: `${fadeIn} 0.2s ease-out`,
});

export const toolSearchingDot = style({
	width: '6px',
	height: '6px',
	borderRadius: '50%',
	backgroundColor: '#4D66E5',
	animation: `${pulse} 1.2s infinite`,
	flexShrink: 0,
});

export const toolResult = style({
	marginTop: '10px',
	padding: '10px 12px',
	backgroundColor: 'rgba(77, 102, 229, 0.05)',
	borderRadius: '10px',
	fontSize: '13px',
	border: '1px solid rgba(77, 102, 229, 0.12)',
});

export const toolResultTitle = style({
	fontSize: '11px',
	color: '#4D66E5',
	fontWeight: 600,
	marginBottom: '6px',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
});

export const toolResultItem = style({
	padding: '6px 0',
	borderBottom: '1px solid rgba(77, 102, 229, 0.1)',

	selectors: {
		'&:last-child': {
			borderBottom: 'none',
			paddingBottom: 0,
		},
	},
});

export const toolResultLink = style({
	color: '#4D66E5',
	textDecoration: 'none',
	fontWeight: 500,

	':hover': {
		textDecoration: 'underline',
	},
});

// Markdown Content
export const markdownContent = style({
	fontSize: '14px',
	lineHeight: 1.6,
});

globalStyle(`${markdownContent} p`, {
	margin: '0 0 8px',
});

globalStyle(`${markdownContent} p:last-child`, {
	marginBottom: 0,
});

globalStyle(`${markdownContent} strong`, {
	fontWeight: 600,
});

globalStyle(`${markdownContent} a`, {
	color: '#4D66E5',
	textDecoration: 'none',
});

globalStyle(`${markdownContent} a:hover`, {
	textDecoration: 'underline',
});

globalStyle(`${markdownContent} code`, {
	backgroundColor: 'rgba(77, 102, 229, 0.08)',
	padding: '1px 5px',
	borderRadius: '4px',
	fontSize: '12.5px',
	fontFamily: "'SF Mono', Menlo, monospace",
});

globalStyle(`${markdownContent} pre`, {
	backgroundColor: 'rgba(0, 0, 0, 0.04)',
	padding: '10px 12px',
	borderRadius: '8px',
	overflow: 'auto',
	margin: '8px 0',
});

globalStyle(`${markdownContent} pre code`, {
	backgroundColor: 'transparent',
	padding: 0,
	fontSize: '12px',
});

globalStyle(`${markdownContent} ul, ${markdownContent} ol`, {
	margin: '4px 0 8px',
	paddingLeft: '20px',
});

globalStyle(`${markdownContent} li`, {
	marginBottom: '2px',
});

globalStyle(`${markdownContent} blockquote`, {
	borderLeft: '3px solid rgba(77, 102, 229, 0.3)',
	margin: '8px 0',
	paddingLeft: '12px',
	color: '#6B7280',
});

globalStyle(
	`${markdownContent} h1, ${markdownContent} h2, ${markdownContent} h3`,
	{
		margin: '12px 0 6px',
		fontWeight: 600,
	},
);

globalStyle(`${markdownContent} h1`, { fontSize: '18px' });
globalStyle(`${markdownContent} h2`, { fontSize: '16px' });
globalStyle(`${markdownContent} h3`, { fontSize: '15px' });
