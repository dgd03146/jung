import { Box, Container } from '@jung/design-system/components';

import { usePathname } from '@/fsd/shared';
import { Header } from '../../Header';
import { Sidebar } from '../../Sidebar';

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
			>
				{!isPostEditPage && <Header />}
				<Box paddingX={{ mobile: '4', laptop: '8' }}>{children}</Box>
			</Box>
		</Container>
	);
}
