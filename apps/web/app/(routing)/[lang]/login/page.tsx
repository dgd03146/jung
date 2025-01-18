import { LoginContent } from '@/fsd/features/auth';
import { createClientForServer } from '@/fsd/shared/index.server';
import { Box, Container } from '@jung/design-system';
import * as styles from './page.css';

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { next?: string };
}) {
	const supabase = createClientForServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<Container className={styles.container}>
			<Box className={styles.card}>
				<LoginContent session={session} next={searchParams.next} />
			</Box>
		</Container>
	);
}
