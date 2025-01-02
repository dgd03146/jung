import { HiTrendingUp } from 'react-icons/hi';
import * as styles from './DashboardStats.css';

const DashboardStats = () => {
	const stats = [
		{
			title: 'Popular Post',
			count: 842,
			trend: +15.3,
			period: 'views this week',
			description: 'Next.js App Router 전환기',
		},
		{
			title: 'Trending Photo',
			count: 567,
			trend: +12.8,
			period: 'views this week',
			description: 'Cherry Blossoms at Yeouido',
		},
		{
			title: 'Hot Spot',
			count: 324,
			trend: +23.5,
			period: 'views this week',
			description: 'Common Ground, Seoul',
		},
		{
			title: 'New Messages',
			count: 28,
			trend: +18.2,
			period: 'this week',
			description: 'Guestbook entries',
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Weekly Highlights</h2>
			</div>
			<div className={styles.statsGrid}>
				{stats.map((stat, index) => (
					<div key={index} className={styles.statsCard}>
						<div className={styles.contentArea}>
							<div className={styles.statsHeader}>
								<div className={styles.statsValue}>
									{stat.count.toLocaleString()}
								</div>
								<div className={styles.statsTitle}>{stat.title}</div>
							</div>
							<div className={styles.statsInfo}>
								{stat.description && (
									<div className={styles.statsDescription}>
										{stat.description}
									</div>
								)}
								<div className={styles.trendArea}>
									<div className={styles.trendValue}>
										<HiTrendingUp size={16} />+{stat.trend}%
									</div>
									<span className={styles.trendPeriod}>{stat.period}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DashboardStats;
