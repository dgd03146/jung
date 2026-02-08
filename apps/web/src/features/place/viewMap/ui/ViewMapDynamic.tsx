'use client';

import { Flex } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/fsd/shared';

const ViewMap = dynamic(() => import('./ViewMap').then((mod) => mod.ViewMap), {
	ssr: false,
	loading: () => (
		<Flex justify='center' align='center' height='1/4'>
			<LoadingSpinner size='large' />
		</Flex>
	),
});

interface ViewMapDynamicProps {
	places?: Place[];
	place?: Place;
	initialCenter?: google.maps.LatLngLiteral;
}

export const ViewMapDynamic = (props: ViewMapDynamicProps) => {
	return <ViewMap {...props} />;
};
