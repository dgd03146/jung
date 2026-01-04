'use client';

import { domAnimation, LazyMotion, m } from 'motion/react';
import Link from 'next/link';
import * as styles from './HomePage.css';

const HomePage = () => {
	const containerAnimation = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.15,
			},
		},
	};

	const itemAnimation = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1] as const,
			},
		},
	};

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				className={styles.container}
				initial='hidden'
				animate='visible'
				variants={containerAnimation}
			>
				<m.header className={styles.header} variants={itemAnimation}>
					<span className={styles.logo}>JUNG.</span>
					<nav className={styles.nav}>
						<Link href='/blog' className={styles.navLink}>
							Blog
						</Link>
						<Link href='/gallery' className={styles.navLink}>
							Gallery
						</Link>
						<Link href='/places' className={styles.navLink}>
							Places
						</Link>
						<Link href='/guestbook' className={styles.navLink}>
							Guestbook
						</Link>
					</nav>
				</m.header>

				<m.main className={styles.main} variants={itemAnimation}>
					<h1 className={styles.heroText}>
						<span className={styles.heroLine}>Dreamer.</span>
						<span className={styles.heroLine}>Do what</span>
						<span className={styles.heroLine}>you love.</span>
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
