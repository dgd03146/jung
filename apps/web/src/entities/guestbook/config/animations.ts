export const containerAnimation = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
} as const;

export const contentAnimation = {
	initial: { scale: 0.8 },
	animate: { scale: 1 },
	transition: {
		type: 'spring',
		stiffness: 260,
		damping: 20,
		delay: 0.2,
	},
} as const;
