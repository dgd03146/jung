import type { GUESTBOOK_COLORS, GUESTBOOK_EMOJIS } from '../config/guestbook';

export type GuestbookColor = (typeof GUESTBOOK_COLORS)[number];
export type GuestbookEmoji = (typeof GUESTBOOK_EMOJIS)[number];
