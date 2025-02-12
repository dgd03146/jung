'use client';

import { Button, Flex, useToast } from '@jung/design-system';
import { usePathname } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import { useAuth } from '../model';
import type { SocialProvider } from '../model/SocialProvider';
import * as styles from './SocialLogin.css';

interface SocialLoginProps {
	onSuccess?: () => void;
}

export function SocialLogin({ onSuccess }: SocialLoginProps) {
	const { handleSocialLogin } = useAuth();
	const pathname = usePathname();
	const showToast = useToast();

	const handleLogin = async (provider: SocialProvider) => {
		try {
			await handleSocialLogin(provider, { redirectTo: pathname });

			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			showToast('failed to login', 'error');
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
			<Button
				className={styles.loginOption.github}
				onClick={() => handleLogin('github')}
			>
				<VscGithub className={styles.iconStyle} color='#FFFFFF' />
				GitHub
			</Button>
		</Flex>
	);
}
