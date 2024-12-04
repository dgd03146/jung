'use client';

import { animate, motion, useMotionValue } from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import * as styles from './MotionCard.css';

type MotionCardProps = {
	children: ReactNode;
};

export const MotionCard = ({ children }: MotionCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const rotateX = useMotionValue(0);
	const rotateY = useMotionValue(0);
	const scale = useMotionValue(1);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		if (!cardRef.current) return;

		const card = cardRef.current;
		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const distanceX = event.clientX - centerX;
		const distanceY = event.clientY - centerY;

		const rotateYValue = (distanceX / (rect.width / 2)) * 15;
		const rotateXValue = -(distanceY / (rect.height / 2)) * 15;

		if (scale.get() === 1) {
			animate(scale, 1.05, {
				type: 'spring',
				stiffness: 400,
				damping: 30,
			});
		}

		animate(rotateX, rotateXValue, {
			type: 'spring',
			stiffness: 400,
			damping: 30,
			mass: 0.5,
		});

		animate(rotateY, rotateYValue, {
			type: 'spring',
			stiffness: 400,
			damping: 30,
			mass: 0.5,
		});
	}

	function handleMouseLeave() {
		animate(scale, 1, {
			type: 'spring',
			stiffness: 400,
			damping: 30,
		});

		animate(rotateX, 0, {
			type: 'spring',
			stiffness: 400,
			damping: 30,
		});

		animate(rotateY, 0, {
			type: 'spring',
			stiffness: 400,
			damping: 30,
		});
	}

	return (
		<motion.div
			ref={cardRef}
			className={styles.motionWrapper}
			style={{
				rotateX,
				rotateY,
				scale,
				transformStyle: 'preserve-3d',
				perspective: '1000px',
				transformOrigin: 'center',
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			initial={false}
		>
			<motion.div
				className={styles.card}
				style={{
					transform: 'translateZ(10px)',
				}}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};
