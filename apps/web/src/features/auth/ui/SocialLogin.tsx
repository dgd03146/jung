'use client';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';

import { createClient } from '@/fsd/shared/lib/utils/supabase/client';
import { Button, Flex } from '@jung/design-system/components';
import * as styles from './SocialLogin.css';

type SocialProvider = 'kakao' | 'google';

const SocialLogin = () => {
	const supabase = createClient();

	const handleSocialLogin = async (provider: SocialProvider) => {
		const next = location.pathname;
		const redirectTo = `${location.origin}${location.pathname
			.split('/')
			.slice(0, 2)
			.join('/')}/auth/callback?next=${encodeURIComponent(next)}`;

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: redirectTo,
			},
		});
		// TODO: 에러처리
		if (error) throw error;
	};

	return (
		<Flex justify='flex-end' columnGap='2' marginTop='2'>
			<Button
				className={styles.loginOption.google}
				onClick={() => handleSocialLogin('google')}
			>
				<FcGoogle className={styles.iconStyle} />
				Google
			</Button>
			{/* <Button
        className={styles.loginOption.naver}
        // onClick={() => handleSocialLogin('naver')}
      >
        <SiNaver className={styles.iconStyle} color="#ffffff" />
        Naver
      </Button> */}
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
