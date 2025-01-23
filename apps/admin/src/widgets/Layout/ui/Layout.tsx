import { usePathname } from '@/fsd/shared';
import { useSidebarStore } from '@/fsd/shared';
import { Box } from '@jung/design-system/components';
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
				style={{
					width: '100%',
					marginLeft: !isPostEditPage && isOpen ? '240px' : '0',
					transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				}}
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
