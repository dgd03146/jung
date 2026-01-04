import { Flex } from '@jung/design-system/components';
import {
	ActivityChart,
	DashboardStats,
	QuickActions,
	RecentActivities,
} from '@/fsd/widgets/Dashboard';

const DashboardPage = () => {
	return (
		<Flex direction={'column'} gap={'5'}>
			<QuickActions />
			<DashboardStats />
			<ActivityChart />
			<RecentActivities />
		</Flex>
	);
};

export default DashboardPage;
