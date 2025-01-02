import { MdAdd, MdLocationOn, MdSettings, MdUpload } from 'react-icons/md';
import * as styles from './QuickActions.css';

const QuickActions = () => {
	const actions = [
		{
			title: 'Create Post',
			description: 'Write a new blog post',
			icon: <MdAdd size={20} />,
			onClick: () => {
				/* 포스트 작성 페이지로 이동 */
			},
		},
		{
			title: 'Upload Images',
			description: 'Add new images to gallery',
			icon: <MdUpload size={20} />,
			onClick: () => {
				/* 이미지 업로드 모달 열기 */
			},
		},
		{
			title: 'Add Location',
			description: 'Register new spot',
			icon: <MdLocationOn size={20} />,
			onClick: () => {
				/* 장소 등록 페이지로 이동 */
			},
		},
		{
			title: 'Settings',
			description: 'Manage your preferences',
			icon: <MdSettings size={20} />,
			onClick: () => {
				/* 설정 페이지로 이동 */
			},
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Quick Actions</h2>
			</div>
			<div className={styles.actionGrid}>
				{actions.map((action, index) => (
					<button
						key={index}
						className={styles.actionButton}
						onClick={action.onClick}
					>
						<div className={styles.iconWrapper}>{action.icon}</div>
						<div className={styles.contentArea}>
							<div className={styles.actionTitle}>{action.title}</div>
							<div className={styles.actionDescription}>
								{action.description}
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default QuickActions;
