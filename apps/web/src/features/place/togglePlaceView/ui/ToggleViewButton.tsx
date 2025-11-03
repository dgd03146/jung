'use client';

import { usePlaceView } from '@/fsd/features/place';
import { Button } from '@jung/design-system/components';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';

export function TogglePlaceViewButton() {
	const { isListView, toggleView } = usePlaceView();

	return (
		<Button
			variant='outline'
			height='10'
			borderRadius='lg'
			onClick={toggleView}
			aria-label={isListView ? '지도로 보기' : '목록으로 보기'}
		>
			{isListView ? <IoMapOutline size={20} /> : <IoGridOutline size={20} />}
		</Button>
	);
}
