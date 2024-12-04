'use client';

import { Grid, GridItem } from '@jung/design-system/components';
import { motion } from 'framer-motion';
import { useGetCollections } from '../api';
import { CollectionItem } from './CollectionItem';

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export function CollectionGrid() {
	const [collections] = useGetCollections({ sort: 'latest' });

	return (
		<motion.div initial='hidden' animate='visible' variants={containerVariants}>
			<Grid
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					desktop: '1/3',
				}}
				gap='6'
			>
				{collections.map((collection, index) => (
					<GridItem key={collection.id} colStart='auto' colEnd='auto'>
						<CollectionItem collection={collection} index={index} />
					</GridItem>
				))}
			</Grid>
		</motion.div>
	);
}
