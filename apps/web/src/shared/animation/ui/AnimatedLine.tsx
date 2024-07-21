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
								scale: [1, 1.2, 0.9, 1.1, 1],
								rotate: [0, 10, -10, 5, 0],
								color: '#A8C2F5',
								transition: {
									duration: 1,
									ease: 'easeInOut',
									times: [0, 0.2, 0.4, 0.6, 0.8],
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
