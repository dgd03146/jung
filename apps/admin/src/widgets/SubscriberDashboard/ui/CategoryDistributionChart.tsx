import {
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useGetSubscriberStats } from '@/fsd/features/subscribers/api';
import * as styles from './CategoryDistributionChart.css';

const COLORS = {
	frontend: '#3B82F6',
	ai: '#8B5CF6',
	both: '#10B981',
};

const LABELS: Record<string, string> = {
	frontend: 'Frontend',
	ai: 'AI',
	both: 'Both',
};

const CategoryDistributionChart = () => {
	const { data: stats } = useGetSubscriberStats();

	const chartData = useMemo(() => {
		if (!stats?.categoryDistribution) return [];
		return Object.entries(stats.categoryDistribution).map(([name, value]) => ({
			name: LABELS[name] ?? name,
			value,
			color: COLORS[name as keyof typeof COLORS] ?? '#6B7280',
		}));
	}, [stats?.categoryDistribution]);

	const total = chartData.reduce((sum, d) => sum + d.value, 0);

	return (
		<Container
			boxShadow='primary'
			background='white'
			borderRadius='2xl'
			style={{ flex: 2 }}
		>
			<Box
				className={styles.borderBottomStyle}
				padding='4'
				borderColor='white300'
				borderStyle='solid'
			>
				<Typography.Text level={3} color='primary' fontWeight='semibold'>
					Category Distribution
				</Typography.Text>
			</Box>
			<Box padding='4' background='white'>
				<ResponsiveContainer width='100%' height={220}>
					<PieChart>
						<Pie
							data={chartData}
							cx='50%'
							cy='50%'
							innerRadius={55}
							outerRadius={85}
							paddingAngle={3}
							dataKey='value'
						>
							{chartData.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							formatter={(value: number, name: string) => [
								`${value} (${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)`,
								name,
							]}
						/>
					</PieChart>
				</ResponsiveContainer>
				<Stack gap='3' paddingX='4'>
					{chartData.map((entry) => (
						<Flex key={entry.name} justify='space-between' align='center'>
							<Flex align='center' gap='2'>
								<Box
									width='3'
									height='3'
									borderRadius='half'
									style={{ background: entry.color }}
								/>
								<Typography.Text level={3}>{entry.name}</Typography.Text>
							</Flex>
							<Typography.Text level={3} fontWeight='medium'>
								{entry.value}{' '}
								<Typography.SubText level={2} color='gray300'>
									({total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0}%)
								</Typography.SubText>
							</Typography.Text>
						</Flex>
					))}
				</Stack>
			</Box>
		</Container>
	);
};

export default CategoryDistributionChart;
