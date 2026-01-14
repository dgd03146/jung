'use client';

import { Flex } from '@jung/design-system/components';
import { motion } from 'motion/react';
import {
	BACKGROUND_ANIMATION,
	MOUNT_ANIMATION,
	PRIMARY_NAV_LIST,
	ROTATE_X_ANIMATION,
	SECONDARY_NAV_LIST,
	SLIDE_LEFT_ANIMATION,
} from '@/fsd/shared/config';
import { Navbar } from '../../Header/ui';
import * as styles from './Menu.css';
import NavLinks from './NavLinks';
import Stairs from './Stairs';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

export default function Menu({ isMenuOpen, toggleMenu }: Props) {
	return (
		<motion.div className={styles.stairs}>
			<Stairs />
			<motion.div
				variants={BACKGROUND_ANIMATION}
				{...MOUNT_ANIMATION}
				className={styles.background}
			>
				<motion.div variants={ROTATE_X_ANIMATION} {...MOUNT_ANIMATION}>
					<Navbar
						isMenuOpen={isMenuOpen}
						toggleMenu={toggleMenu}
						variant='dark'
					/>
				</motion.div>
				<Flex
					className={styles.container}
					justifyContent='center'
					alignItems='center'
					background='primary'
					width='full'
				>
					<motion.div variants={SLIDE_LEFT_ANIMATION} {...MOUNT_ANIMATION}>
						<Flex
							columnGap='16'
							alignItems='center'
							rowGap='8'
							flexDirection={{ mobile: 'column', tablet: 'row' }}
						>
							<NavLinks items={PRIMARY_NAV_LIST} isMainNav />
							<NavLinks items={SECONDARY_NAV_LIST} />
						</Flex>
					</motion.div>
				</Flex>
			</motion.div>
		</motion.div>
	);
}
