'use client';

import { AnimatedLine, useInViewAnimation } from '@/fsd/shared';
import { Stack, Typography } from '@jung/design-system';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useRef } from 'react';
import * as styles from './HomePage.css';

const HomePage = () => {
	const spanRef = useRef<HTMLSpanElement>(null);

	const { controls } = useInViewAnimation({
		once: true,
		ref: spanRef,
	});

	const containerAnimation = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				staggerChildren: 0.2,
			},
		},
	};

	const titleAnimation = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
			},
		},
	};

	const textArray = ['Hey,', "I'm", 'JUNG'];

	return (
		<LazyMotion features={domAnimation}>
			<m.div initial='hidden' animate='visible' variants={containerAnimation}>
				<Stack
					space='0'
					align='center'
					justifyContent='center'
					className={styles.container}
				>
					<m.div variants={titleAnimation}>
						<Typography.Heading variant='hero'>
							<m.span
								ref={spanRef}
								initial='hidden'
								animate={controls}
								variants={{
									visible: {
										transition: {
											staggerChildren: 0.1,
											delayChildren: 0.2,
										},
									},
									hidden: {},
								}}
								aria-hidden
							>
								{textArray.map((line, lineIndex) => (
									<AnimatedLine
										key={`${line}-${lineIndex}`}
										line={line}
										animation={{
											hidden: {
												opacity: 0,
												y: 20,
												rotateX: 90,
											},
											visible: {
												opacity: 1,
												y: 0,
												rotateX: 0,
											},
										}}
									/>
								))}
							</m.span>
						</Typography.Heading>
					</m.div>
				</Stack>
			</m.div>
		</LazyMotion>
	);
};

export default HomePage;
