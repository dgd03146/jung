import {
	Box,
	Container,
	Flex,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { subscriberQueryOptions } from '@/fsd/features/subscribers/api/subscriberQueryOptions';
import * as styles from './CategoryDistributionChart.css';

const COLORS = {
	frontend: '#3B82F6',
	ai: '#8B5CF6',
	both: '#10B981',
	fallback: '#6B7280',
};

const LABELS: Record<string, string> = {
	frontend: 'Frontend',
	ai: 'AI',
	both: 'Both',
};

const CHART_HEIGHT = 220;
const PIE_INNER_RADIUS = 55;
const PIE_OUTER_RADIUS = 85;
const PIE_PADDING_ANGLE = 3;

const formatPercentage = (value: number, total: number) =>
	total > 0 ? ((value / total) * 100).toFixed(1) : '0';

const CategoryDistributionChart = () => {
	const { data: stats } = useQuery(subscriberQueryOptions.stats());

	const { chartData, total } = useMemo(() => {
		if (!stats?.categoryDistribution) return { chartData: [], total: 0 };
		const chartData = Object.entries(stats.categoryDistribution).map(
			([name, value]) => ({
				name: LABELS[name] ?? name,
				value,
				color: COLORS[name as keyof typeof COLORS] ?? COLORS.fallback,
			}),
		);
		const total = chartData.reduce((sum, d) => sum + d.value, 0);
		return { chartData, total };
	}, [stats?.categoryDistribution]);

	return (
		<Container
			boxShadow='primary'
			background='white'
			borderRadius='2xl'
			className={styles.distributionChartContainer}
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
				<ResponsiveContainer width='100%' height={CHART_HEIGHT}>
					<PieChart>
						<Pie
							data={chartData}
							cx='50%'
							cy='50%'
							innerRadius={PIE_INNER_RADIUS}
							outerRadius={PIE_OUTER_RADIUS}
							paddingAngle={PIE_PADDING_ANGLE}
							dataKey='value'
						>
							{chartData.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							formatter={(value: number, name: string) => [
								`${value} (${formatPercentage(value, total)}%)`,
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
									({formatPercentage(entry.value, total)}%)
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
