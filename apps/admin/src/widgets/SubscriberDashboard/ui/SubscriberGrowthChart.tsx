import {
	Box,
	Container,
	Flex,
	Select,
	Typography,
} from '@jung/design-system/components';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	type TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';
import { subscriberQueryOptions } from '@/fsd/features/subscribers';
import * as styles from './SubscriberGrowthChart.css';

type PeriodType = '6m' | '1y';

const isPeriodType = (value: string): value is PeriodType =>
	value === '6m' || value === '1y';

const periods = [
	{ value: '6m' as const, label: 'Last 6 months' },
	{ value: '1y' as const, label: 'Last year' },
];

const CHART_COLORS = {
	newSubscribers: '#3B82F6',
	unsubscribed: '#EF4444',
	grid: '#F1F3F9',
	axis: '#9CA3AF',
	cursor: '#E5E7EB',
};

const PERIOD_MONTHS: Record<PeriodType, number> = {
	'6m': 6,
	'1y': 12,
};

const LINE_STROKE_WIDTH = 2.5;
const DOT_RADIUS = 4;
const ACTIVE_DOT_RADIUS = 8;

const CHART_MARGIN = { top: 5, right: 5, bottom: 5, left: 0 };
const AXIS_FONT_SIZE = 12;

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<Box background='white' borderRadius='xl' padding='4' boxShadow='primary'>
				<Typography.Text level={3} color='black100' fontWeight='semibold'>
					{label}
				</Typography.Text>
				{payload.map((pld) => (
					<Flex key={pld.name} align='center' gap='2'>
						<Box
							width='2'
							height='2'
							borderRadius='half'
							display='inline-block'
							style={{ background: pld.color }}
						/>
						<Typography.Text level={3} color='black100'>
							{pld.name}: {pld.value}
						</Typography.Text>
					</Flex>
				))}
			</Box>
		);
	}
	return null;
};

const SubscriberGrowthChart = () => {
	const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('6m');
	const { data: stats, isLoading } = useQuery(subscriberQueryOptions.stats());

	const chartData = useMemo(() => {
		if (!stats?.monthlyGrowth) return [];
		const months = PERIOD_MONTHS[selectedPeriod];
		return stats.monthlyGrowth.slice(-months);
	}, [stats?.monthlyGrowth, selectedPeriod]);

	if (isLoading || !stats) return null;

	return (
		<Container
			boxShadow='primary'
			background='white'
			borderRadius='2xl'
			className={styles.growthChartContainer}
		>
			<Flex
				className={styles.borderBottomStyle}
				justify='space-between'
				align='center'
				padding='4'
				background='white'
				borderColor='white300'
				borderStyle='solid'
			>
				<Typography.Text level={3} color='primary' fontWeight='semibold'>
					Subscriber Growth
				</Typography.Text>
				<Select
					defaultValue={selectedPeriod}
					onValueChange={(value) => {
						if (isPeriodType(value)) setSelectedPeriod(value);
					}}
				>
					<Select.Label>Period</Select.Label>
					<Select.Trigger placeholder='Select Period' />
					<Select.Menu>
						{periods.map((period) => (
							<Select.Item key={period.value} value={period.value}>
								{period.label}
							</Select.Item>
						))}
					</Select.Menu>
				</Select>
			</Flex>
			<Box padding='4' height='80' background='white'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={chartData} margin={CHART_MARGIN}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke={CHART_COLORS.grid}
							vertical={false}
						/>
						<XAxis
							dataKey='month'
							stroke={CHART_COLORS.axis}
							fontSize={AXIS_FONT_SIZE}
							axisLine={false}
							tickLine={false}
							padding={{ left: 10, right: 10 }}
							tickMargin={12}
						/>
						<YAxis
							stroke={CHART_COLORS.axis}
							fontSize={AXIS_FONT_SIZE}
							axisLine={false}
							tickLine={false}
							tickMargin={16}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ stroke: CHART_COLORS.cursor }}
						/>
						<Legend
							iconType='circle'
							wrapperStyle={{ paddingTop: '1.5rem' }}
							formatter={(value) => (
								<span className={styles.legendText}>{value}</span>
							)}
						/>
						<Line
							type='monotone'
							dataKey='newSubscribers'
							name='New Subscribers'
							stroke={CHART_COLORS.newSubscribers}
							strokeWidth={LINE_STROKE_WIDTH}
							dot={{
								fill: CHART_COLORS.newSubscribers,
								strokeWidth: 0,
								r: DOT_RADIUS,
							}}
							activeDot={{ r: ACTIVE_DOT_RADIUS, strokeWidth: 0 }}
						/>
						<Line
							type='monotone'
							dataKey='unsubscribed'
							name='Unsubscribed'
							stroke={CHART_COLORS.unsubscribed}
							strokeWidth={LINE_STROKE_WIDTH}
							dot={{
								fill: CHART_COLORS.unsubscribed,
								strokeWidth: 0,
								r: DOT_RADIUS,
							}}
							activeDot={{ r: ACTIVE_DOT_RADIUS, strokeWidth: 0 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Container>
	);
};

export default SubscriberGrowthChart;
