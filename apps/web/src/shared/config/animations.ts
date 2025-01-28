export const HEIGHT_ANIMATION = {
	initial: {
		height: 0,
	},
	enter: (i: number) => ({
		height: '100%',
		transition: { duration: 0.5, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] },
	}),
	exit: (i: number) => ({
		height: 0,
		transition: { duration: 0.3, delay: 0.07 * i, ease: [0.33, 1, 0.68, 1] },
	}),
};

export const BACKGROUND_ANIMATION = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
};

export const OPACITY_ANIMATION = {
	initial: {
		opacity: 0,
	},
	enter: (i: number) => ({
		opacity: 1,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: i },
	}),
	exit: {
		opacity: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
};

export const SLIDE_LEFT_ANIMATION = {
	initial: {
		x: 150,
	},
	enter: {
		x: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
	exit: {
		x: 150,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
};

export const ROTATE_X_ANIMATION = {
	initial: {
		rotateX: 90,
		opacity: 0,
	},
	enter: (i: number) => ({
		rotateX: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.33, 1, 0.68, 1],
			delay: 0.3 + i * 0.05,
		},
	}),
	exit: {
		opacity: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
	},
};

export const TEXT_BOUNCE_ANIMATION = {
	transform: [
		'scale3D(1,1,1)',
		'scale3D(1.1,0.85,1)',
		'scale3D(.75,1.25,1)',
		'scale3D(1.25,.85,1)',
		'scale3D(.9,1.05,1)',
		'scale3D(1,1,1)',
	],
	transition: {
		times: [0, 0.4, 0.6, 0.7, 0.8, 0.9],
		duration: 1,
	},

	color: '#A8C2F5',
};

export const TEXT_OPACITY_ANIMATION = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.1,
		},
	},
};

export const MOUNT_ANIMATION = {
	initial: 'initial',
	animate: 'enter',
	exit: 'exit',
};
