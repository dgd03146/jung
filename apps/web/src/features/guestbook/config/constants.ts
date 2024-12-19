export const GUESTBOOK_EMOJIS = [
	'💖',
	'✨',
	'👻',
	'🎉',
	'👋',
	'🙌',
	'💫',
	'💭',
	'💀',
	'👽',
] as const;

export const GUESTBOOK_COLORS = [
	'#FFFFFF',
	'#FFF3E0', // 연한 주황
	'#E8F5E9', // 연한 초록
	'#E3F2FD', // 연한 파랑
	'#F3E5F5', // 연한 보라
	'#FFF8E1', // 연한 노랑
	'#E0F7FA', // 연한 청록
] as const;

export type GuestbookColor = (typeof GUESTBOOK_COLORS)[number];
export type GuestbookEmoji = (typeof GUESTBOOK_EMOJIS)[number];

export const DEFAULT_BACKGROUND_COLOR: GuestbookColor = '#FFFFFF';
export const DEFAULT_EMOJI: GuestbookEmoji = '💖';
