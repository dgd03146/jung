import { LoginContent } from '@/fsd/features/auth';
import { createClientForServer } from '@/fsd/shared/index.server';
import { Box } from '@jung/design-system';
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
		<Box className={styles.container}>
			<div className={styles.card}>
				<LoginContent session={session} next={searchParams.next} />
			</div>
		</Box>
	);
}
