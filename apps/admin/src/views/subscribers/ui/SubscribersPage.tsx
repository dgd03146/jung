import { Flex } from '@jung/design-system/components';
import { SubscriberTable } from '@/fsd/features/subscribers/ui';
import {
	CategoryDistributionChart,
	SubscriberGrowthChart,
	SubscriberStats,
} from '@/fsd/widgets/SubscriberDashboard';

const SubscribersPage = () => {
	return (
		<Flex direction='column' gap='5'>
			<SubscriberStats />
			<Flex gap='5'>
				<SubscriberGrowthChart />
				<CategoryDistributionChart />
			</Flex>
			<SubscriberTable />
		</Flex>
	);
};

export default SubscribersPage;
