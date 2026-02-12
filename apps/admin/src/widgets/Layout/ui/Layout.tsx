import { Box } from '@jung/design-system/components';
import { usePathname, useSidebarStore } from '@/fsd/shared';
import { Header } from '../../Header';
import { Sidebar } from '../../Sidebar';
import * as styles from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { pathname } = usePathname();
	const { isOpen } = useSidebarStore();

	const isLoginPage = pathname === '/login';
	const isPostEditPage = /^\/blog\/(new|edit\/\d+)$/.test(pathname);
	const isDashboardPage = pathname === '/dashboard' || pathname === '/';

	if (isLoginPage) {
		return <>{children}</>;
	}

	return (
		<Box display='flex'>
			{!isPostEditPage && <Sidebar />}
			<Box
				as='main'
				className={styles.mainContent({
					sidebarOpen: !isPostEditPage && isOpen,
				})}
				background={isPostEditPage ? 'white' : 'white100'}
			>
				{!isPostEditPage && <Header />}
				<Box
					paddingX={{
						mobile: isDashboardPage ? '4' : '4',
						tablet: '6',
						laptop: '8',
					}}
					paddingY={{ mobile: '4', tablet: '8' }}
					maxWidth={isPostEditPage ? 'tablet' : 'full'}
					marginX='auto'
					className={styles.section}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
