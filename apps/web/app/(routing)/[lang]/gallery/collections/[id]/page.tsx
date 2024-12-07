import { CollectionDetail } from '@/fsd/features/gallery/photos';

interface CollectionDetailPageProps {
	params: {
		id: string;
	};
}

export default async function CollectionDetailPage({
	params,
}: CollectionDetailPageProps) {
	const { id } = params;

	// void trpc.photoCollections.getCollectionById.prefetch(id);

	return (
		<CollectionDetail id={id} />
		// </HydrateClient>
	);
}
