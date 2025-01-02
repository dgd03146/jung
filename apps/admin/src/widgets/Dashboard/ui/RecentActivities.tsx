import { MdAddPhotoAlternate, MdEdit, MdLocationOn } from 'react-icons/md';
import * as styles from './RecentActivities.css';

const RecentActivities = () => {
	const activities = [
		{
			id: 1,
			title: 'New Blog Post Created',
			description: 'React 18 Updates Summary',
			time: '2024-03-15T10:30:00',
			icon: <MdEdit size={20} />,
			type: 'blog',
		},
		{
			id: 2,
			title: 'Images Added to Gallery',
			description: 'Spring 2024 Collection (5 images)',
			time: '2024-03-15T09:15:00',
			icon: <MdAddPhotoAlternate size={20} />,
			type: 'gallery',
		},
		{
			id: 3,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
		},
		{
			id: 4,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
		},
		{
			id: 5,
			title: 'New Spot Registered',
			description: 'Seoul Forest Café',
			time: '2024-03-15T08:45:00',
			icon: <MdLocationOn size={20} />,
			type: 'spot',
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Recent Activities</h2>
			</div>
			<div className={styles.activityList}>
				{activities.map((activity) => (
					<div key={activity.id} className={styles.activityItem}>
						<div className={styles.iconWrapper}>{activity.icon}</div>
						<div className={styles.contentArea}>
							<div className={styles.activityTitle}>{activity.title}</div>
							<div className={styles.activityMeta}>
								<span className={styles.tag}>{activity.type}</span>
								<span className={styles.description}>
									{activity.description}
								</span>
								<span className={styles.separator}>•</span>
								<time className={styles.time} dateTime={activity.time}>
									10 mins ago
								</time>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentActivities;
