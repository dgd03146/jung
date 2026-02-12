/**
 * Shared Notion-style design tokens for admin CSS.
 *
 * These complement `@jung/design-system/tokens` (palette, space, etc.)
 * by providing neutral rgba values used across all admin `.css.ts` files.
 */

// ── Borders ──────────────────────────────────────
export const border = 'rgba(0, 0, 0, 0.06)';
export const borderHover = 'rgba(0, 0, 0, 0.1)';

// ── Input borders (slightly stronger) ────────────
export const inputBorder = 'rgba(0, 0, 0, 0.1)';
export const inputBorderHover = 'rgba(0, 0, 0, 0.15)';

// ── Backgrounds ──────────────────────────────────
export const hoverBg = 'rgba(0, 0, 0, 0.02)';

// ── Text ─────────────────────────────────────────
export const darkText = 'rgba(0, 0, 0, 0.85)';
export const bodyText = 'rgba(0, 0, 0, 0.8)';
export const mutedText = 'rgba(0, 0, 0, 0.45)';
export const subtleText = 'rgba(0, 0, 0, 0.35)';
export const disabledText = 'rgba(0, 0, 0, 0.25)';

// ── Notion-native text (for rich editors) ────────
export const notionText = 'rgba(55, 53, 47, 1)';
export const notionSecondary = 'rgba(55, 53, 47, 0.65)';

// ── Hover text ──────────────────────────────────
export const hoverText = 'rgba(0, 0, 0, 0.6)';

// ── Overlay / danger ────────────────────────────
export const overlay = 'rgba(0, 0, 0, 0.6)';
export const dangerHover = 'rgba(239, 68, 68, 0.9)';

// ── Primary tints ────────────────────────────────
export const primaryTint = 'rgba(1, 66, 192, 0.06)';
export const primaryRing = 'rgba(1, 66, 192, 0.08)';

// ── Badge tints ─────────────────────────────────
export const successTint = 'rgba(34, 197, 94, 0.08)';
export const successText = '#16a34a';
export const warningTint = 'rgba(234, 179, 8, 0.08)';
export const warningText = '#ca8a04';
export const purpleTint = 'rgba(147, 51, 234, 0.06)';
export const purpleText = '#9333EA';

// ── Shadows ─────────────────────────────────────
export const shadowXs = '0 1px 2px rgba(0, 0, 0, 0.05)';
export const shadowSm = '0 2px 4px rgba(0, 0, 0, 0.06)';
export const shadowMd = '0 4px 6px rgba(0, 0, 0, 0.1)';
