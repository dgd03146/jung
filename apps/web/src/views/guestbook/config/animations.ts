export const animations = {
	fadeInUp: {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring' as const,
				damping: 20,
				stiffness: 100,
			},
		},
	},
};
