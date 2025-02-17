'use client';

import {
	COLLECTION_PARAMS,
	CollectionList,
	useCollectionsQuery,
} from '@/fsd/entities/photo';
import { LoadingSpinner } from '@/fsd/shared';
import { EmptyState } from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';
import { Suspense } from 'react';

export const CollectionContent = () => {
	const [collections] = useCollectionsQuery({
		sort: COLLECTION_PARAMS.sort,
	});

	if (collections.length === 0) {
		return <EmptyState content='collections' />;
	}

	return <CollectionList collections={collections} />;
};

export const CollectionPage = () => {
	return (
		<Suspense
			fallback={
				<Flex justify='center' align='center' height='1/4'>
					<LoadingSpinner size='medium' />
				</Flex>
			}
		>
			<CollectionContent />
		</Suspense>
	);
};
