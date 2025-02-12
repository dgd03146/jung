import { Box, Typography } from '@jung/design-system/components';
import { MdLocationOn } from 'react-icons/md';

interface CoordinatesCellProps {
	lat: number;
	lng: number;
}

export const CoordinatesCell = ({ lat, lng }: CoordinatesCellProps) => (
	<Box display='flex' alignItems='center' gap='2'>
		<MdLocationOn color='#4B5563' />
		<Typography.Text level={3} color='gray600' whiteSpace='nowrap'>
			{lat.toFixed(6)}, {lng.toFixed(6)}
		</Typography.Text>
	</Box>
);
