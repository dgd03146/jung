import { Container } from '@jung/design-system/components';
import { useState } from 'react';

import { useSupabaseAuth } from '@/fsd/shared/lib';
import type { Comment } from '@jung/shared/types';
import { useGetCommentsQuery } from '../api/useGetComments';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentStats from './CommentStats';

// const COMMENTS_DATA: Comment[] = [
//   {
//     id: 'comment1',
//     postId: 'post1', // 예시 postId
//     userId: 'user1',
//     userName: '김철수',
//     userProfileImage:
//       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//     content: '정말 좋은 글이네요. 많은 도움이 되었습니다!',
//     createdAt: '2023-05-15T09:30:00Z',
//     likes: 5,
//     parentId: null,
//     replies: [
//       {
//         id: 'comment1-reply1',
//         postId: 'post1',
//         userId: 'user4',
//         userName: '최수진',
//         userProfileImage:
//           'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//         content: '김철수님 의견에 전적으로 동의합니다!',
//         createdAt: '2023-05-15T11:30:00Z',
//         likes: 2,

//         parentId: 'comment1',
//       },
//       {
//         id: 'comment1-reply2',
//         postId: 'post1',
//         userId: 'user6',
//         userName: '박영호',
//         userProfileImage:
//           'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//         content: '저도 이 글을 읽고 많은 인사이트를 얻었습니다.',
//         createdAt: '2023-05-15T13:45:00Z',
//         likes: 1,

//         parentId: 'comment1',
//       },
//     ],
//   },
//   {
//     id: 'comment2',
//     postId: 'post1',
//     userId: 'user2',
//     userName: '이영희',
//     userProfileImage:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//     content: '흥미로운 주제입니다. 더 자세히 알고 싶어요.',
//     createdAt: '2023-05-15T10:15:00Z',
//     likes: 3,

//     parentId: null,

//     replies: [
//       {
//         id: 'comment2-reply1',
//         postId: 'post1',
//         userId: 'user7',
//         userName: '김지원',
//         userProfileImage:
//           'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//         content: '저도 궁금했던 부분이에요. 좋은 질문이네요!',
//         createdAt: '2023-05-15T11:20:00Z',
//         likes: 1,

//         parentId: 'comment2',
//       },
//       {
//         id: 'comment2-reply2',
//         postId: 'post1',
//         userId: 'user8',
//         userName: '이민준',
//         userProfileImage:
//           'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//         content: '추가 자료를 공유해 드릴게요. [링크]',
//         createdAt: '2023-05-15T12:05:00Z',
//         likes: 3,

//         parentId: 'comment2',
//       },
//     ],
//   },
//   {
//     id: 'comment3',
//     postId: 'post1',
//     userId: 'user3',
//     userName: '박지민',
//     userProfileImage:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//     content: '저도 비슷�� 경험이 있어요. 공감됩니다.',
//     createdAt: '2023-05-15T11:00:00Z',
//     likes: 7,

//     parentId: null,
//     replies: [],
//   },
//   {
//     id: 'comment4',
//     postId: 'post1',
//     userId: 'user5',
//     userName: '정민우',
//     userProfileImage:
//       'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
//     content: '이 부분에 대해 조금 더 설명해주실 수 있나요?',
//     createdAt: '2023-05-15T12:45:00Z',
//     likes: 1,

//     parentId: null,

//     replies: [],
//   },
// ];

interface Props {
	postId: string;
}

const Comments = ({ postId }: Props) => {
	const { items: comments } = useGetCommentsQuery(postId)[0];

	const [newComment, setNewComment] = useState('');

	const { session, user, signOut } = useSupabaseAuth();

	const handleCommentSubmit = () => {
		if (!user || !newComment.trim()) return;

		// const newCommentObj: Comment = {
		// 	id: Date.now().toString(),
		// 	userId: user.id,
		// 	userName:
		// 		user.user_metadata?.full_name ||
		// 		user.email?.split('@')[0] ||
		// 		'Anonymous',
		// 	userProfileImage: user.user_metadata?.avatar_url || '/default-avatar.png',
		// 	content: newComment,
		// 	createdAt: new Date().toISOString(),
		// 	likes: 0,
		// 	provider: user.app_metadata?.provider || 'unknown',
		// 	parentId: null,
		// };

		// setComments((prevComments) => [newCommentObj, ...prevComments]);
		// setNewComment('');
	};

	const commentCount = comments.length;
	const likeCount = comments.reduce(
		(sum: number, comment: Comment) => sum + comment.likes,
		0,
	);

	return (
		<Container marginY='20'>
			<CommentStats commentCount={commentCount} likeCount={likeCount} />
			<CommentForm
				session={session}
				user={user}
				newComment={newComment}
				setNewComment={setNewComment}
				handleCommentSubmit={handleCommentSubmit}
				handleSignOut={signOut}
			/>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Container>
	);
};

export default Comments;
