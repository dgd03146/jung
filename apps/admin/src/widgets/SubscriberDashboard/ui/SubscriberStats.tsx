import {
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { useQuery } from '@tanstack/react-query';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { subscriberQueryOptions } from '@/fsd/features/subscribers/api/subscriberQueryOptions';
import * as styles from './SubscriberStats.css';

const SubscriberStats = () => {
	const { data: stats, isLoading } = useQuery(subscriberQueryOptions.stats());

	if (isLoading || !stats) return null;

	const activeRate = stats.total
		? ((stats.active / stats.total) * 100).toFixed(1)
		: null;
	const churnRateDisplay = `${stats.churnRate.toFixed(1)}%`;
	const hasChurn = stats.churnRate > 0;

	const statCards = [
		{
			title: 'Total Subscribers',
			count: stats.total,
			description: 'All time signups',
		},
		{
			title: 'Active',
			count: stats.active,
			description: 'Currently subscribed',
			trend: activeRate,
		},
		{
			title: 'New This Month',
			count: stats.newThisMonth,
			description: 'Subscribed this month',
		},
		{
			title: 'Churn Rate',
			count: churnRateDisplay,
			description: 'Inactive / Total',
			isChurn: hasChurn,
		},
	];

	return (
		<Container boxShadow='primary' background='white' borderRadius='2xl'>
			<Box
				className={styles.borderBottomStyle}
				padding='4'
				borderColor='white300'
				borderStyle='solid'
			>
				<Typography.Text level={3} color='primary' fontWeight='semibold'>
					Subscriber Overview
				</Typography.Text>
			</Box>
			<Box className={styles.gridContainer}>
				{statCards.map((stat) => (
					<Flex
						key={stat.title}
						paddingY='6'
						paddingX='8'
						position='relative'
						className={styles.gridItem}
					>
						<Stack gap='4' flex={1}>
							<Flex gap='3' justify='space-between' align='center'>
								<Typography.Text
									level={4}
									color='primary'
									fontWeight='semibold'
								>
									{typeof stat.count === 'number'
										? stat.count.toLocaleString()
										: stat.count}
								</Typography.Text>
								<Typography.Text
									level={4}
									color='primary300'
									fontWeight='semibold'
								>
									{stat.title}
								</Typography.Text>
							</Flex>
							<Stack gap='2'>
								<Typography.SubText level={2}>
									{stat.description}
								</Typography.SubText>
								{stat.trend && (
									<Flex align='center' gap='1.5' paddingY='1.5' paddingX='2.5'>
										<Typography.Text level={2} color='success'>
											<HiTrendingUp size={16} aria-hidden='true' />
											{stat.trend}%
										</Typography.Text>
									</Flex>
								)}
								{stat.isChurn && (
									<Flex align='center' gap='1.5' paddingY='1.5' paddingX='2.5'>
										<Typography.Text level={2} color='error'>
											<HiTrendingDown size={16} aria-hidden='true' />
										</Typography.Text>
									</Flex>
								)}
							</Stack>
						</Stack>
					</Flex>
				))}
			</Box>
		</Container>
	);
};

export default SubscriberStats;
