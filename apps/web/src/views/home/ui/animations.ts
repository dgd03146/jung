import type { Variants } from 'motion/react';

// Shared easing curve (cubic-bezier)
const EASE_OUT_QUART = [0.25, 0.1, 0.25, 1] as const;

// Animation timing constants
const ANIMATION_DURATION = {
	CONTAINER: 0.6,
	ITEM: 0.6,
	LETTER: 0.5,
	HOVER: 0.2,
} as const;

const STAGGER_DELAY = {
	CHILDREN: 0.15,
	LETTER: 0.04,
	LINE_BASE: 0.4,
	LINE_INCREMENT: 0.15,
} as const;

const OFFSET = {
	ITEM_Y: 20,
	LETTER_Y: 40,
	HOVER_Y: -8,
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
			ease: EASE_OUT_QUART,
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
			ease: EASE_OUT_QUART,
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
	ease: EASE_OUT_QUART,
};

export const letterHoverEffect = { y: OFFSET.HOVER_Y };

export const HERO_LINES = ['Dream', 'And', 'Do what', 'you love.'] as const;
