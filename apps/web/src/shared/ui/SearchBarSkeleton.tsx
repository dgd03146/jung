'use client';

import { Box, Flex } from '@jung/design-system/components';
import { IoSearchOutline } from 'react-icons/io5';
import * as styles from './SearchBar.css';
import * as skeletonStyles from './SearchBarSkeleton.css';

export function SearchBarSkeleton() {
	return (
		<Box className={styles.searchWrapper} boxShadow='primary'>
			<Flex
				align='center'
				justify='center'
				color='gray300'
				width='8'
				flexShrink={0}
			>
				<IoSearchOutline size={18} />
			</Flex>
			<Box className={`${styles.input} ${skeletonStyles.skeletonInput}`}>
				<Box className={skeletonStyles.shimmer} />
			</Box>
		</Box>
	);
}
