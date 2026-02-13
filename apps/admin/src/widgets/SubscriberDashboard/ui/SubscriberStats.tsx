import {
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { useGetSubscriberStats } from '@/fsd/features/subscribers/api';
import * as styles from './SubscriberStats.css';

const SubscriberStats = () => {
	const { data: stats } = useGetSubscriberStats();

	const statCards = [
		{
			title: 'Total Subscribers',
			count: stats?.total ?? 0,
			description: 'All time signups',
		},
		{
			title: 'Active',
			count: stats?.active ?? 0,
			description: 'Currently subscribed',
			trend: stats?.total
				? ((stats.active / stats.total) * 100).toFixed(1)
				: '0',
		},
		{
			title: 'New This Month',
			count: stats?.newThisMonth ?? 0,
			description: 'Subscribed this month',
		},
		{
			title: 'Churn Rate',
			count: `${(stats?.churnRate ?? 0).toFixed(1)}%`,
			description: 'Inactive / Total',
			isChurn: true,
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
											<HiTrendingUp size={16} />
											{stat.trend}%
										</Typography.Text>
									</Flex>
								)}
								{stat.isChurn && (stats?.churnRate ?? 0) > 0 && (
									<Flex align='center' gap='1.5' paddingY='1.5' paddingX='2.5'>
										<Typography.Text level={2} color='error'>
											<HiTrendingDown size={16} />
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
