import {
	Box,
	Container,
	Flex,
	Textarea,
	Typography,
} from '@jung/design-system/components';
import { FaRegComment } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import * as styles from './Comments.css';

const Comments = () => {
	return (
		<Container marginY='10'>
			<Flex alignItems='center' columnGap='1' marginBottom='4'>
				<FaRegComment size={18} color='#0142C0' />
				<Typography.SubText level={2} color='primary'>
					{/* {post.likeCount || 0} */}
					{100}
				</Typography.SubText>
			</Flex>
			<Box
				borderRadius='xl'
				boxShadow='secondary'
				// borderColor="primary"
				// borderStyle="solid"
				// borderWidth="hairline"
				padding='4'
			>
				<Textarea
					size='base'
					rows={3}
					variant='ghost'
					width='full'
					placeholder='로그인하고 댓글 작성하기'
					border='none'
				/>
				<Flex justify='flex-end' columnGap='2'>
					<div className={styles.loginOption.google}>
						<FcGoogle className={styles.iconStyle} />
						<Typography.SubText level={3} color='inherit'>
							Google
						</Typography.SubText>
					</div>
					<div className={styles.loginOption.naver}>
						<SiNaver
							className={styles.iconStyle}
							style={{ color: '#ffffff' }}
						/>
						<Typography.SubText level={3} color='inherit'>
							Naver
						</Typography.SubText>
					</div>
					<div className={styles.loginOption.kakao}>
						<SiKakaotalk
							className={styles.iconStyle}
							style={{ color: '#000000' }}
						/>
						<Typography.SubText level={3} color='inherit'>
							Kakao
						</Typography.SubText>
					</div>
				</Flex>
			</Box>
		</Container>
	);
};

export default Comments;
