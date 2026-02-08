import { Accordion } from '@jung/design-system';
import { Link } from '@tanstack/react-router';
import { HiHome } from 'react-icons/hi';
import { usePathname, useSidebarStore } from '@/fsd/shared';
import * as styles from './Sidebar.css';

const menuSections = [
	{
		title: 'Dashboard',
		path: '/',
		label: 'Dashboard',
		icon: HiHome,
	},
	{
		title: 'Newsletter',
		items: [
			{ path: '/articles', label: 'Articles' },
			{ path: '/articles/new', label: 'New Article' },
		],
	},
	{
		title: 'Blog',
		items: [
			{ path: '/blog', label: 'Posts' },
			{ path: '/blog/new', label: 'New Post' },
			{ path: '/blog/categories', label: 'Categories' },
		],
	},
	{
		title: 'Gallery',
		items: [
			{ path: '/gallery/photos', label: 'Photos' },
			{ path: '/gallery/collections', label: 'Collections' },
			{ path: '/gallery/photos/new', label: 'New Photos' },
		],
	},
	{
		title: 'Places',
		items: [
			{ path: '/places', label: 'Places' },
			{ path: '/places/new', label: 'New Place' },
			{ path: '/places/categories', label: 'Categories' },
		],
	},
	{
		title: 'GuestBook',
		items: [{ path: '/guestbook', label: 'Messages' }],
	},
];

export const Sidebar = () => {
	const { pathname: currentPage } = usePathname();
	const { isOpen } = useSidebarStore();

	return (
		<aside className={styles.sidebar({ isOpen })}>
			<Accordion type='multiple'>
				{menuSections.map((section) =>
					section.items ? (
						<Accordion.Item key={section.title}>
							<Accordion.Trigger>{section.title}</Accordion.Trigger>
							<Accordion.Content>
								{section.items.map((item) => (
									<Link key={item.label} to={item.path}>
										<Accordion.Panel active={currentPage === item.path}>
											{item.label}
										</Accordion.Panel>
									</Link>
								))}
							</Accordion.Content>
						</Accordion.Item>
					) : (
						<Link
							key={section.title}
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
					),
				)}
			</Accordion>
		</aside>
	);
};

export default Sidebar;
