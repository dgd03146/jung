'use client';

import { Box } from '@jung/design-system/components';
import type { Collection } from '@jung/shared/types';
import { motion } from 'framer-motion';
import { collectionListVariants } from '../config/animations';
import { CollectionItem } from './CollectionItem';
import * as styles from './CollectionList.css';

interface CollectionListProps {
	collections: Collection[];
}

export const CollectionList = ({ collections }: CollectionListProps) => {
	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={collectionListVariants}
		>
			<Box className={styles.collectionListGrid}>
				{collections.map((collection, index) => (
					<CollectionItem
						key={collection.id}
						collection={collection}
						index={index}
					/>
				))}
			</Box>
		</motion.div>
	);
};
