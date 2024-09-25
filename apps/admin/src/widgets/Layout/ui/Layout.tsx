import { Box, Container } from '@jung/design-system/components';

import { usePathname } from '@/fsd/shared';
import { Header } from '@/fsd/widgets/Header/ui';
import { Sidebar } from '@/fsd/widgets/Sidebar/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { pathname } = usePathname();

	const isPostEditPage = /^\/blog\/(new|edit\/\d+)$/.test(pathname);

	return (
		<Container display='flex' minHeight='screenDvh'>
			{!isPostEditPage && <Sidebar />}
			<Box
				as='section'
				flex='1'
				background={isPostEditPage ? 'white' : 'white200'}
				paddingX={{ mobile: '4', laptop: '20' }}
				paddingY={isPostEditPage ? '4' : '10'}
			>
				{!isPostEditPage && <Header />}
				{children}
			</Box>
		</Container>
	);
}
