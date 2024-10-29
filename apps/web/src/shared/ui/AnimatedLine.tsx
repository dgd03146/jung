'use client';

import { Box } from '@jung/design-system';
import { type Variant, useAnimationControls } from 'framer-motion';
import { m } from 'framer-motion';
import { memo, useCallback, useMemo } from 'react';

type AnimatedLineProps = {
	line: string;
	animation: {
		hidden: Variant;
		visible: Variant;
	};
};

export const AnimatedLine = memo(({ line, animation }: AnimatedLineProps) => {
	const controls = useAnimationControls();

	const animations = useMemo(
		() => ({
			letter: {
				hidden: {
					opacity: 0,
					y: 15,
					rotateX: 90,
				},
				visible: {
					opacity: 1,
					y: 0,
					rotateX: 0,
					transition: {
						type: 'spring',
						damping: 20,
						stiffness: 100,
						duration: 0.4,
					},
				},
			},
			word: {
				hidden: {
					opacity: 0,
					y: 10,
					filter: 'blur(10px)',
				},
				visible: {
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					transition: {
						type: 'spring',
						damping: 20,
						stiffness: 100,
						delayChildren: 0.2,
						staggerChildren: 0.05,
					},
				},
			},
			hover: {
				scale: 1.1,
				y: -3,
				color: '#A8C2F5',
				transition: {
					type: 'tween',
					ease: 'easeOut',
					duration: 0.2,
				},
			},
			tap: {
				scale: 0.95,
				transition: {
					type: 'spring',
					stiffness: 300,
					damping: 15,
				},
			},
		}),
		[],
	);

	const words = useMemo(() => line.split(' '), [line]);

	const handleHover = useCallback(() => {
		controls.start('hover');
	}, [controls]);

	const AnimatedChar = memo(({ char }: { char: string }) => (
		<m.span
			style={{
				display: 'inline-block',
				position: 'relative',
				whiteSpace: 'pre',
				transformStyle: 'preserve-3d',
				willChange: 'transform',
			}}
			variants={animations.letter}
			whileHover={animations.hover}
			whileTap={animations.tap}
		>
			{char}
		</m.span>
	));

	AnimatedChar.displayName = 'AnimatedChar';

	return (
		<Box
			as='span'
			display='block'
			style={{
				willChange: 'transform',
				backfaceVisibility: 'hidden',
			}}
		>
			{words.map((word, wordIndex) => (
				<m.span
					key={`${word}-${wordIndex}`}
					style={{
						display: 'inline-block',
						margin: '0 4px',
						perspective: '1000px',
						transformStyle: 'preserve-3d',
						willChange: 'transform',
					}}
					variants={animations.word}
					onHoverStart={handleHover}
				>
					{word.split('').map((char, charIndex) => (
						<AnimatedChar key={`${char}-${charIndex}`} char={char} />
					))}
				</m.span>
			))}
		</Box>
	);
});

AnimatedLine.displayName = 'AnimatedLine';
