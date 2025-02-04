import { HEIGHT_ANIMATION, MOUNT_ANIMATION } from '@/fsd/shared/config';
import { motion } from 'framer-motion';
import * as styles from './Menu.css';

const Stairs = () => {
	return (
		<>
			{[...Array(5)].map((_, index) => (
				<motion.div
					variants={HEIGHT_ANIMATION}
					{...MOUNT_ANIMATION}
					custom={4 - index}
					className={styles.stair}
				/>
			))}
		</>
	);
};

export default Stairs;
