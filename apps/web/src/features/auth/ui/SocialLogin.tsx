'use client';

import { Button, Flex } from '@jung/design-system';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { useAuth } from '../model';
import * as styles from './SocialLogin.css';

interface SocialLoginProps {
	onSuccess?: () => void;
}

export function SocialLogin({ onSuccess }: SocialLoginProps) {
	const { handleSocialLogin } = useAuth();

	const handleLogin = async (provider: 'google' | 'kakao') => {
		try {
			await handleSocialLogin(provider);

			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	// TODO: GITHUB 로그인 추가, 추후 추가 예정
	return (
		<Flex justify='flex-end' columnGap='2' marginTop='2'>
			<Button
				className={styles.loginOption.google}
				onClick={() => handleLogin('google')}
			>
				<FcGoogle className={styles.iconStyle} />
				Google
			</Button>
			<Button
				className={styles.loginOption.kakao}
				onClick={() => handleLogin('kakao')}
			>
				<SiKakaotalk className={styles.iconStyle} color='#000000' />
				Kakao
			</Button>
		</Flex>
	);
}
