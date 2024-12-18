'use client';

import { MessageForm, MessageWall } from '@/fsd/features/visitors/ui';
import { motion } from 'framer-motion';
import * as styles from './VisitorsPage.css';

const VisitorsPage = () => {
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

	const itemAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
			},
		},
	};

	return (
		<div className={styles.container}>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={containerAnimation}
				className={styles.content}
			>
				<div className={styles.header}>
					<motion.h1 variants={itemAnimation} className={styles.title}>
						GuestBook
					</motion.h1>
					<motion.p variants={itemAnimation} className={styles.subtitle}>
						Share Your Thoughts ✨
					</motion.p>
					<motion.p variants={itemAnimation} className={styles.description}>
						Leave a message to the owner of this website.
					</motion.p>
				</div>

				<motion.div variants={itemAnimation}>
					<MessageForm />
				</motion.div>

				<motion.div variants={itemAnimation}>
					<MessageWall />
				</motion.div>
			</motion.div>
		</div>
	);
};

export default VisitorsPage;
