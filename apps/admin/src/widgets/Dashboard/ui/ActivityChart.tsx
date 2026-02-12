import {
	Box,
	Container,
	Flex,
	Select,
	Typography,
} from '@jung/design-system/components';
import { useState } from 'react';
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
import * as styles from './AcitivityChart.css';

type PageType = 'all' | 'home' | 'gallery' | 'posts' | 'spots';
type PeriodType = '7d' | '30d' | '1y';

interface DataPoint {
	date: string;
	visitors: number;
	pageViews: number;
	avgDuration: number;
}

interface PageData {
	home: DataPoint[];
	gallery: DataPoint[];
	posts: DataPoint[];
	spots: DataPoint[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
	active?: boolean;
	payload?: {
		name: string;
		value: number;
		color: string;
		dataKey: keyof DataPoint;
	}[];
	label?: string;
}

const periods = [
	{ value: '7d' as const, label: 'Last 7 days' },
	{ value: '30d' as const, label: 'Last 30 days' },
	{ value: '1y' as const, label: 'Last year' },
];

const pages = [
	{ value: 'all' as const, label: 'All Pages' },
	{ value: 'home' as const, label: 'Home' },
	{ value: 'gallery' as const, label: 'Gallery' },
	{ value: 'posts' as const, label: 'Posts' },
	{ value: 'spots' as const, label: 'Spots' },
];

const MOCK_DATA: Record<PeriodType, PageData> = {
	'7d': {
		home: [
			{ date: '3/10', visitors: 42, pageViews: 156, avgDuration: 2.8 },
			{ date: '3/11', visitors: 58, pageViews: 187, avgDuration: 3.2 },
			{ date: '3/12', visitors: 89, pageViews: 245, avgDuration: 2.5 },
			{ date: '3/13', visitors: 45, pageViews: 167, avgDuration: 2.9 },
			{ date: '3/14', visitors: 76, pageViews: 210, avgDuration: 3.4 },
			{ date: '3/15', visitors: 98, pageViews: 289, avgDuration: 3.1 },
			{ date: '3/16', visitors: 85, pageViews: 234, avgDuration: 2.7 },
		],
		gallery: [
			{ date: '3/10', visitors: 28, pageViews: 89, avgDuration: 3.2 },
			{ date: '3/11', visitors: 35, pageViews: 112, avgDuration: 3.5 },
			{ date: '3/12', visitors: 42, pageViews: 145, avgDuration: 2.8 },
			{ date: '3/13', visitors: 31, pageViews: 98, avgDuration: 3.1 },
			{ date: '3/14', visitors: 45, pageViews: 156, avgDuration: 3.7 },
			{ date: '3/15', visitors: 52, pageViews: 178, avgDuration: 3.4 },
			{ date: '3/16', visitors: 48, pageViews: 167, avgDuration: 3.0 },
		],
		posts: [
			{ date: '3/10', visitors: 35, pageViews: 120, avgDuration: 4.1 },
			{ date: '3/11', visitors: 42, pageViews: 145, avgDuration: 3.8 },
			{ date: '3/12', visitors: 56, pageViews: 189, avgDuration: 4.2 },
			{ date: '3/13', visitors: 38, pageViews: 134, avgDuration: 3.9 },
			{ date: '3/14', visitors: 48, pageViews: 167, avgDuration: 4.5 },
			{ date: '3/15', visitors: 62, pageViews: 210, avgDuration: 4.0 },
			{ date: '3/16', visitors: 55, pageViews: 198, avgDuration: 4.3 },
		],
		spots: [
			{ date: '3/10', visitors: 22, pageViews: 67, avgDuration: 2.5 },
			{ date: '3/11', visitors: 28, pageViews: 89, avgDuration: 2.8 },
			{ date: '3/12', visitors: 35, pageViews: 112, avgDuration: 2.3 },
			{ date: '3/13', visitors: 25, pageViews: 78, avgDuration: 2.6 },
			{ date: '3/14', visitors: 32, pageViews: 98, avgDuration: 2.9 },
			{ date: '3/15', visitors: 38, pageViews: 123, avgDuration: 2.7 },
			{ date: '3/16', visitors: 34, pageViews: 108, avgDuration: 2.4 },
		],
	},
	'30d': {
		home: Array.from({ length: 30 }, (_, i) => ({
			date: `${Math.floor(i / 30)}/#{(i % 30) + 1}`,
			visitors: Math.floor(Math.random() * 60) + 40,
			pageViews: Math.floor(Math.random() * 150) + 150,
			avgDuration: +(Math.random() * 2 + 2).toFixed(1),
		})),
		gallery: Array.from({ length: 30 }, (_, i) => ({
			date: `${Math.floor(i / 30)}/#{(i % 30) + 1}`,
			visitors: Math.floor(Math.random() * 40) + 20,
			pageViews: Math.floor(Math.random() * 100) + 80,
			avgDuration: +(Math.random() * 2 + 2).toFixed(1),
		})),
		posts: Array.from({ length: 30 }, (_, i) => ({
			date: `${Math.floor(i / 30)}/#{(i % 30) + 1}`,
			visitors: Math.floor(Math.random() * 50) + 30,
			pageViews: Math.floor(Math.random() * 120) + 100,
			avgDuration: +(Math.random() * 2 + 3).toFixed(1),
		})),
		spots: Array.from({ length: 30 }, (_, i) => ({
			date: `${Math.floor(i / 30)}/#{(i % 30) + 1}`,
			visitors: Math.floor(Math.random() * 30) + 20,
			pageViews: Math.floor(Math.random() * 80) + 60,
			avgDuration: +(Math.random() * 1.5 + 2).toFixed(1),
		})),
	},
	'1y': {
		home: Array.from({ length: 12 }, (_, i) => ({
			date: `${i + 1}���`,
			visitors: Math.floor(Math.random() * 1000) + 800,
			pageViews: Math.floor(Math.random() * 3000) + 2000,
			avgDuration: +(Math.random() * 2 + 2).toFixed(1),
		})),
		gallery: Array.from({ length: 12 }, (_, i) => ({
			date: `${i + 1}월`,
			visitors: Math.floor(Math.random() * 800) + 600,
			pageViews: Math.floor(Math.random() * 2000) + 1500,
			avgDuration: +(Math.random() * 2 + 2).toFixed(1),
		})),
		posts: Array.from({ length: 12 }, (_, i) => ({
			date: `${i + 1}월`,
			visitors: Math.floor(Math.random() * 900) + 700,
			pageViews: Math.floor(Math.random() * 2500) + 1800,
			avgDuration: +(Math.random() * 2 + 3).toFixed(1),
		})),
		spots: Array.from({ length: 12 }, (_, i) => ({
			date: `${i + 1}월`,
			visitors: Math.floor(Math.random() * 600) + 400,
			pageViews: Math.floor(Math.random() * 1500) + 1000,
			avgDuration: +(Math.random() * 1.5 + 2).toFixed(1),
		})),
	},
};

const PAGE_COUNT = 4;

const CHART_COLORS = {
	visitors: '#6366F1',
	pageViews: '#10B981',
	avgDuration: '#F59E0B',
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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
							{pld.name}:
						</Typography.Text>
						<Typography.Text level={3} color='black100'>
							{pld.dataKey === 'avgDuration'
								? `${pld.value} min`
								: pld.value.toLocaleString()}
						</Typography.Text>
					</Flex>
				))}
			</Box>
		);
	}
	return null;
};

const ActivityChart = () => {
	const [selectedPage, setSelectedPage] = useState<PageType>('all');
	const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('7d');

	const getData = (): DataPoint[] => {
		if (selectedPage === 'all') {
			return MOCK_DATA[selectedPeriod].home.map((item, index) => ({
				date: item.date,
				visitors: Object.values(MOCK_DATA[selectedPeriod]).reduce(
					(sum, pageData) => sum + pageData[index].visitors,
					0,
				),
				pageViews: Object.values(MOCK_DATA[selectedPeriod]).reduce(
					(sum, pageData) => sum + pageData[index].pageViews,
					0,
				),
				avgDuration:
					Object.values(MOCK_DATA[selectedPeriod]).reduce(
						(sum, pageData) => sum + pageData[index].avgDuration,
						0,
					) / PAGE_COUNT,
			}));
		}

		const pageKey = selectedPage as keyof PageData;
		return MOCK_DATA[selectedPeriod][pageKey];
	};

	const data = getData();

	return (
		<Container boxShadow='primary' background='white' borderRadius='2xl'>
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
					Weekly Activity
				</Typography.Text>
				<Flex align='center' gap='2'>
					<Select
						defaultValue={selectedPage}
						onValueChange={(value) => setSelectedPage(value as PageType)}
					>
						<Select.Label>Page</Select.Label>
						<Select.Trigger placeholder='Select Page' />
						<Select.Menu>
							{pages.map((page) => (
								<Select.Item key={page.value} value={page.value}>
									{page.label}
								</Select.Item>
							))}
						</Select.Menu>
					</Select>

					<Select
						defaultValue={selectedPeriod}
						onValueChange={(value) => setSelectedPeriod(value as PeriodType)}
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
			</Flex>
			<Box padding='4' height='80' background='white'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart
						data={data}
						margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
					>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='#F1F3F9'
							vertical={false}
						/>
						<XAxis
							dataKey='date'
							stroke='#9CA3AF'
							fontSize={12}
							axisLine={false}
							tickLine={false}
							padding={{ left: 10, right: 10 }}
							tickMargin={12}
						/>
						<YAxis
							stroke='#9CA3AF'
							fontSize={12}
							axisLine={false}
							tickLine={false}
							tickFormatter={(value) => value.toLocaleString()}
							tickMargin={16}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ stroke: '#E5E7EB' }}
						/>
						<Legend
							iconType='circle'
							wrapperStyle={{
								paddingTop: '1.5rem',
							}}
							formatter={(value) => (
								<span
									style={{
										color: '#4B5563',
										fontSize: '0.875rem',
										fontWeight: '500',
									}}
								>
									{value}
								</span>
							)}
						/>
						<Line
							type='monotone'
							dataKey='visitors'
							name='Unique Visitors'
							stroke={CHART_COLORS.visitors}
							strokeWidth={2.5}
							dot={{ fill: CHART_COLORS.visitors, strokeWidth: 0, r: 4 }}
							activeDot={{ r: 8, strokeWidth: 0 }}
						/>
						<Line
							type='monotone'
							dataKey='pageViews'
							name='Page Views'
							stroke={CHART_COLORS.pageViews}
							strokeWidth={2.5}
							dot={{ fill: CHART_COLORS.pageViews, strokeWidth: 0, r: 4 }}
							activeDot={{ r: 8, strokeWidth: 0 }}
						/>
						<Line
							type='monotone'
							dataKey='avgDuration'
							name='Avg. Duration (min)'
							stroke={CHART_COLORS.avgDuration}
							strokeWidth={2.5}
							dot={{ fill: CHART_COLORS.avgDuration, strokeWidth: 0, r: 4 }}
							activeDot={{ r: 8, strokeWidth: 0 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Box>
		</Container>
	);
};

export default ActivityChart;
