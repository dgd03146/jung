'use client';

import {
	type MotionValue,
	animate,
	motion,
	useMotionValue,
} from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import * as styles from './MotionCard.css';

type MotionCardProps = {
	children: ReactNode;
	sensitivity?: number; // 회전 민감도 조절
	hoverScale?: number; // 호버 시 확대 비율
};

// 애니메이션 설정 상수화
const SPRING_OPTIONS = {
	type: 'spring' as const,
	stiffness: 400,
	damping: 30,
};

export const MotionCard = ({
	children,
	sensitivity = 15,
	hoverScale = 1.05,
}: MotionCardProps) => {
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

		const rotateYValue = (distanceX / (rect.width / 2)) * sensitivity;
		const rotateXValue = -(distanceY / (rect.height / 2)) * sensitivity;

		if (scale.get() === 1) {
			animateMotionValue(scale, hoverScale);
		}

		animateMotionValue(rotateX, rotateXValue, { mass: 0.5 });
		animateMotionValue(rotateY, rotateYValue, { mass: 0.5 });
	}

	function handleMouseLeave() {
		animateMotionValue(scale, 1);
		animateMotionValue(rotateX, 0);
		animateMotionValue(rotateY, 0);
	}

	function animateMotionValue(
		value: MotionValue<number>,
		target: number,
		options = {},
	) {
		animate(value, target, { ...SPRING_OPTIONS, ...options });
	}

	return (
		<motion.div
			ref={cardRef}
			className={styles.motionWrapper}
			style={{
				rotateX,
				rotateY,
				scale,
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
