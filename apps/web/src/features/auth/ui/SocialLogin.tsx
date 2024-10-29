'use client';

import { Button, Flex } from '@jung/design-system';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { useAuth } from '../model';
import * as styles from './SocialLogin.css';

const SocialLogin = () => {
	const { handleSocialLogin } = useAuth();

	return (
		<Flex justify='flex-end' columnGap='2' marginTop='2'>
			<Button
				className={styles.loginOption.google}
				onClick={() => handleSocialLogin('google')}
			>
				<FcGoogle className={styles.iconStyle} />
				Google
			</Button>
			<Button
				className={styles.loginOption.kakao}
				onClick={() => handleSocialLogin('kakao')}
			>
				<SiKakaotalk className={styles.iconStyle} color='#000000' />
				Kakao
			</Button>
		</Flex>
	);
};

export default SocialLogin;
