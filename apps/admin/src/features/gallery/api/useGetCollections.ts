import { collectionKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../services/getCollections';

export const useGetCollections = () => {
	return useQuery({
		queryKey: collectionKeys.all,
		queryFn: getCollections,
	});
};
