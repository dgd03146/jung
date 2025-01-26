import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Typography,
} from '@jung/design-system/components';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import * as styles from './Analytics.css';

const Analytics = () => {
	const pageViews = [
		{ date: '03/01', views: 2400, uniqueViews: 1800 },
		{ date: '03/02', views: 1398, uniqueViews: 1200 },
		{ date: '03/03', views: 9800, uniqueViews: 7400 },
		{ date: '03/04', views: 3908, uniqueViews: 2900 },
		{ date: '03/05', views: 4800, uniqueViews: 3600 },
		{ date: '03/06', views: 3800, uniqueViews: 2800 },
		{ date: '03/07', views: 4300, uniqueViews: 3200 },
	];

	const topPosts = [
		{
			title: 'Next.js App Router 전환기',
			views: 842,
			avgTime: '4:23',
			engagement: '12.5%',
		},
		{
			title: 'React Server Components 실전 적용기',
			views: 654,
			avgTime: '5:12',
			engagement: '15.2%',
		},
		{
			title: 'TypeScript 5.0 새로운 기능들',
			views: 543,
			avgTime: '3:45',
			engagement: '10.8%',
		},
	];

	return (
		<Box padding='6'>
			<Grid
				gridTemplateColumns={{ mobile: '1', tablet: '1/2', laptop: '1/4' }}
				gap='4'
				marginBottom='6'
			>
				<Container
					boxShadow='primary'
					background='white'
					borderRadius='xl'
					padding='4'
				>
					<Typography.Text level={3} color='gray500'>
						Total Views
					</Typography.Text>
					<Typography.Heading level={3} color='primary' marginY='2'>
						24,589
					</Typography.Heading>
					<Typography.Text level={3} color='success'>
						+12.3%
					</Typography.Text>
				</Container>

				<Container
					boxShadow='primary'
					background='white'
					borderRadius='xl'
					padding='4'
				>
					<Typography.Text level={3} color='gray500'>
						Avg. Time on Page
					</Typography.Text>
					<Typography.Heading level={3} color='primary' marginY='2'>
						4m 32s
					</Typography.Heading>
					<Typography.Text level={3} color='success'>
						+5.8%
					</Typography.Text>
				</Container>

				<Container
					boxShadow='primary'
					background='white'
					borderRadius='xl'
					padding='4'
				>
					<Typography.Text level={3} color='gray500'>
						Bounce Rate
					</Typography.Text>
					<Typography.Heading level={3} color='primary' marginY='2'>
						32.8%
					</Typography.Heading>
					<Typography.Text level={3} color='success'>
						+2.1%
					</Typography.Text>
				</Container>

				<Container
					boxShadow='primary'
					background='white'
					borderRadius='xl'
					padding='4'
				>
					<Typography.Text level={3} color='gray500'>
						User Engagement
					</Typography.Text>
					<Typography.Heading level={3} color='primary' marginY='2'>
						15.2%
					</Typography.Heading>
					<Typography.Text level={3} color='success'>
						+8.4%
					</Typography.Text>
				</Container>
			</Grid>

			<Container
				boxShadow='primary'
				background='white'
				borderRadius='xl'
				marginBottom='6'
			>
				<Flex
					justify='space-between'
					align='center'
					padding='4'
					borderBottomWidth='hairline'
					borderColor='white300'
					borderStyle='solid'
				>
					<Typography.Text level={3} color='primary' fontWeight='semibold'>
						Traffic Overview
					</Typography.Text>
					<Flex gap='2'>
						<Button variant='ghost' size='sm'>
							Day
						</Button>
						<Button variant='ghost' size='sm'>
							Week
						</Button>
						<Button variant='ghost' size='sm'>
							Month
						</Button>
					</Flex>
				</Flex>
				<Box padding='4' height='96'>
					<ResponsiveContainer width='100%' height='100%'>
						<AreaChart
							data={pageViews}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray='3 3'
								vertical={false}
								stroke='#f1f5f9'
							/>
							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tick={{ fill: '#64748b', fontSize: 12 }}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tick={{ fill: '#64748b', fontSize: 12 }}
							/>
							<Tooltip
								contentStyle={{
									background: 'white',
									border: '1px solid #f1f5f9',
									borderRadius: '6px',
									padding: '8px 12px',
								}}
								labelStyle={{ color: '#64748b', fontWeight: 500 }}
							/>
							<Area
								type='monotone'
								dataKey='views'
								stackId='1'
								stroke='#0142C0'
								fill='#0142C020'
								strokeWidth={2}
							/>
							<Area
								type='monotone'
								dataKey='uniqueViews'
								stackId='2'
								stroke='#16a34a'
								fill='#16a34a20'
								strokeWidth={2}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</Box>
			</Container>

			<Container boxShadow='primary' background='white' borderRadius='xl'>
				<Box
					padding='4'
					borderBottomWidth='hairline'
					borderColor='white300'
					borderStyle='solid'
				>
					<Typography.Text level={3} color='primary' fontWeight='semibold'>
						Top Performing Content
					</Typography.Text>
				</Box>
				<Box padding='4'>
					<div className={styles.table}>
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Views</th>
									<th>Avg. Time</th>
									<th>Engagement</th>
								</tr>
							</thead>
							<tbody>
								{topPosts.map((post, index) => (
									<tr key={index}>
										<td>{post.title}</td>
										<td>{post.views.toLocaleString()}</td>
										<td>{post.avgTime}</td>
										<td>{post.engagement}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Box>
			</Container>
		</Box>
	);
};

export default Analytics;
