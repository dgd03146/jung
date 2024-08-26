import { Box, Container } from '@jung/design-system/components';

import { Header } from '@/fsd/widgets/Header/ui';
import { Sidebar } from '@/fsd/widgets/Sidebar/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Container display='flex' minHeight='screenDvh'>
			<Sidebar />
			<Box
				as='section'
				flex='1'
				background='white200'
				paddingX='20'
				paddingY='10'
			>
				<Header />
				{children}
			</Box>
			{/* </Box> */}
		</Container>
	);
}
