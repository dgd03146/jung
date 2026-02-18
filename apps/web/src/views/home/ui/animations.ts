import type { Variants } from 'motion/react';

// Shared easing curve (expo out — 더 드라마틱한 감속)
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Animation timing constants
const ANIMATION_DURATION = {
	CONTAINER: 0.6,
	ITEM: 0.7,
	LETTER: 0.6,
	HOVER: 0.2,
} as const;

const STAGGER_DELAY = {
	CHILDREN: 0.15,
	LETTER: 0.035,
	LINE_BASE: 0.2,
	LINE_INCREMENT: 0.15,
} as const;

const OFFSET = {
	ITEM_Y: 30,
	LETTER_Y: 60,
	HOVER_Y: -10,
} as const;

export const containerAnimation: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: ANIMATION_DURATION.CONTAINER,
			staggerChildren: STAGGER_DELAY.CHILDREN,
		},
	},
};

export const itemAnimation: Variants = {
	hidden: { opacity: 0, y: OFFSET.ITEM_Y },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: ANIMATION_DURATION.ITEM,
			ease: EASE_OUT_EXPO,
		},
	},
};

export const letterAnimation: Variants = {
	hidden: { opacity: 0, y: OFFSET.LETTER_Y },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: ANIMATION_DURATION.LETTER,
			ease: EASE_OUT_EXPO,
		},
	},
};

export const createLineAnimation = (lineIndex: number): Variants => ({
	hidden: {},
	visible: {
		transition: {
			staggerChildren: STAGGER_DELAY.LETTER,
			delayChildren:
				STAGGER_DELAY.LINE_BASE + lineIndex * STAGGER_DELAY.LINE_INCREMENT,
		},
	},
});

export const letterHoverTransition = {
	duration: ANIMATION_DURATION.HOVER,
	ease: EASE_OUT_EXPO,
};

export const letterHoverEffect = { y: OFFSET.HOVER_Y, scale: 1.05 };

export const HERO_LINES = ['Dream', 'And', 'Do what', 'you love.'] as const;
