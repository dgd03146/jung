import { Flex } from '@jung/design-system/components';
import { LoadingSpinner } from '@/fsd/shared';

export default function Loading() {
	return (
		<Flex justify='center' align='center' height='1/4'>
			<LoadingSpinner size='medium' />
		</Flex>
	);
}
