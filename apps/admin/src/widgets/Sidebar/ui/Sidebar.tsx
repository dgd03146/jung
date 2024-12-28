import { usePathname } from '@/fsd/shared';
import { useSidebarStore } from '@/fsd/shared';
import { Link } from '@tanstack/react-router';
import { HiChevronDown, HiHome } from 'react-icons/hi';
import * as styles from './Sidebar.css';

const menuSections = [
	{
		title: 'Dashboard',
		path: '/',
		label: 'Dashboard',
		icon: HiHome,
	},
	{
		title: 'Blog',
		items: [
			{ path: '/blog', label: ' Posts' },
			{ path: '/blog/new', label: 'New Post' },
			{ path: '/blog/categories', label: 'Categories' },
		],
	},
	{
		title: 'Gallery',
		items: [
			{ path: '/gallery', label: 'Photos' },
			{ path: '/gallery/upload', label: 'Upload' },
			{ path: '/gallery/albums', label: 'Albums' },
		],
	},
	{
		title: 'Spots',
		items: [
			{ path: '/spots/all', label: ' Spots' },
			{ path: '/spots/add', label: 'Add Spot' },
			{ path: '/spots/categories', label: 'Categories' },
		],
	},
	{
		title: 'GuestBook',
		items: [
			{ path: '/guestbook', label: 'Messages' }, // 전체 방명록 목록
		],
	},
	{
		title: 'Settings',
		items: [
			{ path: '/settings/general', label: 'General' },
			{ path: '/settings/appearance', label: 'Appearance' },
			{ path: '/settings/users', label: 'Users' },
		],
	},
];

export const Sidebar = () => {
	const { pathname: currentPage } = usePathname();
	const { isOpen, openSections, actions } = useSidebarStore();

	return (
		<aside className={styles.sidebar({ isOpen })}>
			<nav className={styles.nav}>
				{menuSections.map((section) => (
					<div key={section.title} className={styles.section}>
						{section.items ? (
							<>
								<button
									onClick={() => actions.toggleSection(section.title)}
									className={styles.sectionHeader}
									type='button'
								>
									<span className={styles.sectionTitle}>{section.title}</span>
									<HiChevronDown
										className={styles.chevronIcon({
											isOpen: openSections.includes(section.title),
										})}
									/>
								</button>
								<div
									className={styles.sectionContent({
										isOpen: openSections.includes(section.title),
									})}
								>
									{section.items.map((item) => (
										<Link
											key={item.path}
											to={item.path}
											className={styles.sectionItem({
												active: currentPage === item.path,
											})}
										>
											<span>{item.label}</span>
										</Link>
									))}
								</div>
							</>
						) : (
							<Link
								to={section.path}
								className={styles.dashboardItem({
									active: currentPage === section.path,
								})}
							>
								{section.icon && (
									<section.icon className={styles.dashboardIcon} />
								)}
								<span>{section.label}</span>
							</Link>
						)}
					</div>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
