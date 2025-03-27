import { Button } from '@jung/design-system/components';
import { signOut } from '../api/signoutAction';

export const SocialLogoutButton = () => {
	return (
		<form action={signOut}>
			<Button
				marginTop='4'
				type='submit'
				boxShadow='secondary'
				size='md'
				borderRadius='lg'
			>
				Sign Out
			</Button>
		</form>
	);
};
