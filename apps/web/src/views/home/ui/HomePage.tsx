'use client';

import { PRIMARY_NAV_LIST } from '@/fsd/app';
import { AnimatedLine, useInViewAnimation } from '@/fsd/shared';
import { Flex, Stack, Typography } from '@jung/design-system';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
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

	const navAnimation = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const navItemAnimation = {
		hidden: {
			opacity: 0,
			x: -20,
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
			},
		},
	};

	const textArray = ['GEOJUNG'];

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
						<Typography.Heading {...styles.heading}>
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

					<m.div variants={navAnimation}>
						<Flex columnGap='6' marginTop='10'>
							{PRIMARY_NAV_LIST.map((it) => (
								<m.div
									key={it.id}
									variants={navItemAnimation}
									whileHover={{
										scale: 1.05,
										y: -2,
										transition: {
											type: 'spring',
											stiffness: 400,
											damping: 10,
										},
									}}
									whileTap={{ scale: 0.95 }}
								>
									<Link href={it.path}>
										<Typography.Heading
											level={4}
											color={{
												base: 'primary',
												hover: 'primary200',
											}}
										>
											{it.label}
										</Typography.Heading>
									</Link>
								</m.div>
							))}
						</Flex>
					</m.div>
				</Stack>
			</m.div>
		</LazyMotion>
	);
};

export default HomePage;
