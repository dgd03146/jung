'use client';

import {
	COLLECTION_DEFAULTS,
	CollectionList,
	useCollectionsQuery,
} from '@/fsd/entities/photo';
import { EmptyState } from '@/fsd/shared';

export const CollectionContent = () => {
	const { data: collections } = useCollectionsQuery({
		sort: COLLECTION_DEFAULTS.sort,
	});

	if (collections.length === 0) {
		return <EmptyState content='collections' />;
	}

	return <CollectionList collections={collections} />;
};
