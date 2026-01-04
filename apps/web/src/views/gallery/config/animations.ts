export const photoDetailVariants = {
	image: {
		hidden: {
			opacity: 0,
			scale: 1.01,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: [0.16, 1, 0.3, 1],
			},
		},
	},
	content: {
		hidden: {
			opacity: 0,
			y: 5,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: [0.16, 1, 0.3, 1],
				staggerChildren: 0.05,
			},
		},
	},
} as const;
