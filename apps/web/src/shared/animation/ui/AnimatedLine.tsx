'use client';

import { Box } from '@jung/design-system';
import { type Variant, motion } from 'framer-motion';

type AnimatedLineProps = {
	line: string;
	animation: {
		hidden: Variant;
		visible: Variant;
	};
};

export const AnimatedLine = ({ line, animation }: AnimatedLineProps) => {
	return (
		<Box as='span' display='block'>
			{line.split(' ').map((word, wordIndex) => (
				<Box as='span' display='inline-block' key={`${word}-${wordIndex}`}>
					{word.split('').map((char, charIndex) => (
						<motion.span
							key={`${char}-${charIndex}`}
							style={{ display: 'inline-block' }}
							variants={animation}
							whileHover={{
								transform: [
									'scale3D(1,1,1)',
									'scale3D(1.4,.55,1)',
									'scale3D(.75,1.25,1)',
									'scale3D(1.25,.85,1)',
									'scale3D(.9,1.05,1)',
									'scale3D(1,1,1)',
								],
								color: '#A8C2F5',
								transition: {
									times: [0, 0.4, 0.6, 0.7, 0.8, 0.9],
									duration: 0.9,
								},
							}}
						>
							{char}
						</motion.span>
					))}
					<Box as='span' display='inline-block'>
						&nbsp;
					</Box>
				</Box>
			))}
		</Box>
	);
};
