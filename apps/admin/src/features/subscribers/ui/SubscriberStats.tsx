import { Box, Flex, Typography } from '@jung/design-system/components';
import { useQuery } from '@tanstack/react-query';
import { subscriberQueryOptions } from '../api/subscriberQueryOptions';

const StatCard = ({
	label,
	value,
	color,
}: {
	label: string;
	value: number;
	color?: string;
}) => (
	<Box
		padding='4'
		borderRadius='lg'
		boxShadow='primary'
		style={{ minWidth: '140px' }}
	>
		<Typography.SubText level={1} color='primary200'>
			{label}
		</Typography.SubText>
		<Typography.Heading level={4} style={{ color }}>
			{value}
		</Typography.Heading>
	</Box>
);

const SubscriberStats = () => {
	const { data: stats, isLoading } = useQuery(subscriberQueryOptions.stats());

	if (isLoading || !stats) {
		return null;
	}

	return (
		<Flex gap='4' wrap='wrap'>
			<StatCard label='Total' value={stats.total} />
			<StatCard label='Active' value={stats.active} color='#059669' />
			<StatCard label='Inactive' value={stats.inactive} color='#DC2626' />
			<StatCard
				label='Frontend'
				value={stats.categoryDistribution.frontend}
				color='#0142C0'
			/>
			<StatCard
				label='AI'
				value={stats.categoryDistribution.ai}
				color='#9333EA'
			/>
			<StatCard
				label='Both'
				value={stats.categoryDistribution.both}
				color='#D97706'
			/>
		</Flex>
	);
};

export default SubscriberStats;
