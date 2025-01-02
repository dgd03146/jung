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
		<div className={styles.container}>
			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statTitle}>Total Views</div>
					<div className={styles.statValue}>24,589</div>
					<div className={styles.statTrend}>+12.3%</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statTitle}>Avg. Time on Page</div>
					<div className={styles.statValue}>4m 32s</div>
					<div className={styles.statTrend}>+5.8%</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statTitle}>Bounce Rate</div>
					<div className={styles.statValue}>32.8%</div>
					<div className={styles.statTrend}>+2.1%</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statTitle}>User Engagement</div>
					<div className={styles.statValue}>15.2%</div>
					<div className={styles.statTrend}>+8.4%</div>
				</div>
			</div>

			<div className={styles.chartSection}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>Traffic Overview</h2>
					<div className={styles.periodSelector}>
						<button className={styles.periodButton}>Day</button>
						<button className={styles.periodButton}>Week</button>
						<button className={styles.periodButton}>Month</button>
					</div>
				</div>
				<div className={styles.chart}>
					<ResponsiveContainer width='100%' height={400}>
						<AreaChart
							data={pageViews}
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
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
				</div>
			</div>

			<div className={styles.contentSection}>
				<h2 className={styles.sectionTitle}>Top Performing Content</h2>
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
			</div>
		</div>
	);
};

export default Analytics;
