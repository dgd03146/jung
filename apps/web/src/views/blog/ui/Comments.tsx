import {
	Box,
	Button,
	Container,
	Flex,
	Textarea,
	Typography,
} from '@jung/design-system/components';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import * as styles from './Comments.css';

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(date);
};

type Provider = 'google' | 'kakao' | 'naver';

interface Comment {
	id: string;
	userId: string;
	userName: string;
	userProfileImage: string;
	content: string;
	createdAt: string;
	likes: number;
	provider: Provider;
	parentId: string | null;
	replies?: Comment[];
}

interface CommentItemProps {
	comment: Comment;
	isReply?: boolean;
}

const COMMENTS_DATA: Comment[] = [
	{
		id: 'comment1',
		userId: 'user1',
		userName: '김철수',
		userProfileImage:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
		content: '정말 좋은 글이네요. 많은 도움이 되었습니다!',
		createdAt: '2023-05-15T09:30:00Z',
		likes: 5,
		provider: 'google',
		parentId: null,
		replies: [
			{
				id: 'comment1-reply1',
				userId: 'user4',
				userName: '최수진',
				userProfileImage:
					'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
				content: '김철수님 의견에 전적으로 동의합니다!',
				createdAt: '2023-05-15T11:30:00Z',
				likes: 2,
				provider: 'google',
				parentId: 'comment1',
			},
			{
				id: 'comment1-reply2',
				userId: 'user6',
				userName: '박영호',
				userProfileImage:
					'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
				content: '저도 이 글을 읽고 많은 인사이트를 얻었습니다.',
				createdAt: '2023-05-15T13:45:00Z',
				likes: 1,
				provider: 'naver',
				parentId: 'comment1',
			},
		],
	},
	{
		id: 'comment2',
		userId: 'user2',
		userName: '이영희',
		userProfileImage:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
		content: '흥미로운 주제입니다. 더 자세히 알고 싶어요.',
		createdAt: '2023-05-15T10:15:00Z',
		likes: 3,
		provider: 'kakao',
		parentId: null,
		replies: [
			{
				id: 'comment2-reply1',
				userId: 'user7',
				userName: '김지원',
				userProfileImage:
					'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
				content: '저도 궁금했던 부분이에요. 좋은 질문이네요!',
				createdAt: '2023-05-15T11:20:00Z',
				likes: 1,
				provider: 'google',
				parentId: 'comment2',
			},
			{
				id: 'comment2-reply2',
				userId: 'user8',
				userName: '이민준',
				userProfileImage:
					'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
				content: '추가 자료를 공유해 드릴게요. [링크]',
				createdAt: '2023-05-15T12:05:00Z',
				likes: 3,
				provider: 'naver',
				parentId: 'comment2',
			},
			{
				id: 'comment2-reply3',
				userId: 'user9',
				userName: '최서연',
				userProfileImage:
					'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
				content: '이민준님 감사합니다. 자료 잘 보겠습니다!',
				createdAt: '2023-05-15T13:30:00Z',
				likes: 1,
				provider: 'kakao',
				parentId: 'comment2',
			},
		],
	},
	{
		id: 'comment3',
		userId: 'user3',
		userName: '박지민',
		userProfileImage:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
		content: '저도 비슷한 경험이 있어요. 공감됩니다.',
		createdAt: '2023-05-15T11:00:00Z',
		likes: 7,
		provider: 'naver',
		parentId: null,
		replies: [],
	},
	{
		id: 'comment5',
		userId: 'user5',
		userName: '정민우',
		userProfileImage:
			'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
		content: '이 부분에 대해 조금 더 설명해주실 수 있나요?',
		createdAt: '2023-05-15T12:45:00Z',
		likes: 1,
		provider: 'kakao',
		parentId: null,
		replies: [],
	},
];

// const Comments = () => {
//   return (
//     <Container marginY="20">
//       <Flex columnGap="4" alignItems="center" marginBottom="2">
//         <Flex alignItems="center" columnGap="1">
//           <FaRegComment size={18} color="#0142C0" />
//           <Typography.SubText level={2} color="primary">
//             {100}
//           </Typography.SubText>
//         </Flex>
//         <Flex alignItems="center" columnGap="1">
//           <FaRegHeart size={18} color="#0142C0" />
//           <Typography.SubText level={2} color="primary">
//             {100}
//           </Typography.SubText>
//         </Flex>
//       </Flex>
//       <Box
//         borderRadius="lg"
//         // boxShadow="secondary"
//         borderColor="primary"
//         borderStyle="solid"
//         borderWidth="hairline"
//         padding="4"
//       >
//         <Flex align="center" columnGap="2">
//           <FaRegUserCircle size="25" />
//           <Typography.Text level={3}>{'Nickname'}</Typography.Text>
//         </Flex>
//       </Box>

//       <Box
//         borderRadius="lg"
//         // boxShadow="secondary"
//         borderColor="primary"
//         borderStyle="solid"
//         borderWidth="hairline"
//         padding="4"
//       >
//         <Textarea
//           size="base"
//           rows={3}
//           variant="ghost"
//           width="full"
//           placeholder="로그인하고 댓글 작성하기"
//           border="none"
//         />
//         <Flex justify="flex-end" columnGap="2">
//           <Button className={styles.loginOption.google}>
//             <FcGoogle className={styles.iconStyle} />
//             <Typography.SubText level={3} color="inherit">
//               Google
//             </Typography.SubText>
//           </Button>
//           <Button className={styles.loginOption.naver}>
//             <SiNaver className={styles.iconStyle} color="#ffffff" />
//             <Typography.SubText level={3} color="inherit">
//               Naver
//             </Typography.SubText>
//           </Button>
//           <Button className={styles.loginOption.kakao}>
//             <SiKakaotalk className={styles.iconStyle} color="#000000" />
//             <Typography.SubText level={3} color="inherit">
//               Kakao
//             </Typography.SubText>
//           </Button>
//         </Flex>
//       </Box>
//     </Container>
//   );
// };

const CommentItem = ({ comment, isReply = false }: CommentItemProps) => (
	<Box className={isReply ? styles.replyContainer : styles.commentContainer}>
		<Flex className={styles.commentHeader}>
			<Box
				as='img'
				src={comment.userProfileImage}
				alt={comment.userName}
				className={styles.userAvatar}
			/>
			<Flex direction='column'>
				<Typography.Text level={3}>{comment.userName}</Typography.Text>
				<Typography.FootNote level={1} color='gray100'>
					{formatDate(comment.createdAt)}
				</Typography.FootNote>
			</Flex>
		</Flex>
		<Typography.SubText className={styles.commentContent}>
			{comment.content}
		</Typography.SubText>
		<Flex className={styles.commentFooter}>
			<Flex>
				<Button
					className={`${styles.actionButton} ${styles.actionButtonHover}`}
				>
					<FaRegHeart size={12} style={{ marginRight: '4px' }} />
					{comment.likes}
				</Button>
				<Button
					className={`${styles.actionButton} ${styles.actionButtonHover}`}
				>
					<FaRegComment size={12} style={{ marginRight: '4px' }} />
					답글
				</Button>
			</Flex>
		</Flex>
		{comment.replies?.map((reply) => (
			<CommentItem key={reply.id} comment={reply} isReply={true} />
		))}
	</Box>
);

const Comments = () => {
	return (
		<Container marginY='20'>
			<Flex columnGap='4' alignItems='center' marginBottom='4'>
				<Flex alignItems='center' columnGap='1'>
					<FaRegComment size={18} color='#0142C0' />
					<Typography.SubText level={2} color='primary'>
						{COMMENTS_DATA.length}
					</Typography.SubText>
				</Flex>
				<Flex alignItems='center' columnGap='1'>
					<FaRegHeart size={18} color='#0142C0' />
					<Typography.SubText level={2} color='primary'>
						{COMMENTS_DATA.reduce((sum, comment) => sum + comment.likes, 0)}
					</Typography.SubText>
				</Flex>
			</Flex>

			<Box className={styles.commentContainer} marginBottom='4'>
				<Textarea
					className={styles.textarea}
					rows={3}
					placeholder='로그인하고 댓글 작성하기'
				/>
				<Flex justify='flex-end' columnGap='2' marginTop='2'>
					<Button className={styles.loginOption.google}>
						<FcGoogle className={styles.iconStyle} />
						Google
					</Button>
					<Button className={styles.loginOption.naver}>
						<SiNaver
							className={styles.iconStyle}
							style={{ color: '#ffffff' }}
						/>
						Naver
					</Button>
					<Button className={styles.loginOption.kakao}>
						<SiKakaotalk
							className={styles.iconStyle}
							style={{ color: '#000000' }}
						/>
						Kakao
					</Button>
				</Flex>
			</Box>

			{COMMENTS_DATA.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Container>
	);
};

export default Comments;
