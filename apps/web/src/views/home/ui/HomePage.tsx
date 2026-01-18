'use client';

import { domAnimation, LazyMotion, m } from 'motion/react';
import {
	containerAnimation,
	createLineAnimation,
	HERO_LINES,
	itemAnimation,
	letterAnimation,
	letterHoverEffect,
	letterHoverTransition,
} from './animations';
import * as styles from './HomePage.css';

const HomePage = () => {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				className={styles.container}
				initial='hidden'
				animate='visible'
				variants={containerAnimation}
			>
				<m.main className={styles.main} variants={itemAnimation}>
					<h1 className={styles.heroText}>
						{HERO_LINES.map((line, lineIndex) => (
							<m.span
								key={line}
								className={styles.heroLine}
								initial='hidden'
								animate='visible'
								variants={createLineAnimation(lineIndex)}
							>
								{line.split('').map((char, charIndex) => (
									<m.span
										key={`${char}-${charIndex}`}
										variants={letterAnimation}
										whileHover={letterHoverEffect}
										transition={letterHoverTransition}
										style={{ display: 'inline-block', cursor: 'default' }}
									>
										{char === ' ' ? '\u00A0' : char}
									</m.span>
								))}
							</m.span>
						))}
					</h1>
				</m.main>

				<m.aside className={styles.sidebar} variants={itemAnimation}>
					<div className={styles.infoBlock}>
						<span className={styles.label}>Location</span>
						<span className={styles.value}>Seoul, Korea</span>
					</div>
					<div className={styles.infoBlock}>
						<span className={styles.label}>Role</span>
						<span className={styles.value}>Product Engineer</span>
					</div>
					<div className={styles.infoBlock}>
						<span className={styles.label}>Contact</span>
						<span className={styles.value}>ibory1220@gmail.com</span>
					</div>
				</m.aside>
			</m.div>
		</LazyMotion>
	);
};

export default HomePage;
