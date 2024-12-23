import * as styles from './Menu.css';

import { PRIMARY_NAV_LIST, SECONDARY_NAV_LIST } from '@/fsd/app';
import { background, mountAnim, rotateX, slideLeft } from '@/fsd/shared';
import { Flex } from '@jung/design-system';
import { motion } from 'framer-motion';
import { Navbar } from '../../Header/ui';
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
				variants={background}
				{...mountAnim}
				className={styles.background}
			>
				<motion.div variants={rotateX} {...mountAnim}>
					<Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</motion.div>
				<Flex
					className={styles.container}
					justifyContent='center'
					alignItems='center'
					background='primary'
					width='full'
				>
					<motion.div variants={slideLeft} {...mountAnim}>
						<Flex
							columnGap='16'
							alignItems='center'
							rowGap='8'
							flexDirection={{ mobile: 'column', tablet: 'row' }}
						>
							<NavLinks items={PRIMARY_NAV_LIST} isMainNav />
							<NavLinks items={SECONDARY_NAV_LIST} />
						</Flex>
						<Flex columnGap='4' marginTop='20'>
							{/* <Button variant='ghost' onClick={toggleMenu}>
								<Typography.Text color='white'>en</Typography.Text>
							</Button>
							<Button variant='ghost' onClick={toggleMenu}>
								<Typography.Text color='white'>ko</Typography.Text>
							</Button> */}
						</Flex>
					</motion.div>
				</Flex>
			</motion.div>
		</motion.div>
	);
}
