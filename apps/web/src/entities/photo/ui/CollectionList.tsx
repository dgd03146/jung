'use client';

import { Grid } from '@jung/design-system/components';
import type { Collection } from '@jung/shared/types';
import { motion } from 'framer-motion';
import { collectionListVariants } from '../config/animations';
import { CollectionItem } from './CollectionItem';

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
			<Grid
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					desktop: '1/3',
				}}
				gap='6'
			>
				{collections.map((collection, index) => (
					<CollectionItem
						key={collection.id}
						collection={collection}
						index={index}
					/>
				))}
			</Grid>
		</motion.div>
	);
};
