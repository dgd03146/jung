import SocialLogin from '@/fsd/features/auth/ui/SocialLogin';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import {
	Box,
	Button,
	Flex,
	Textarea,
	Typography,
} from '@jung/design-system/components';
import { useCommentSubmit } from '../model/useCommentSubmit';
import * as styles from './Comments.css';

interface CommentFormProps {
	postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
	const { session, user, signOut } = useSupabaseAuth();
	const { newComment, setNewComment, submitComment } = useCommentSubmit(postId);

	const onSubmit = () => {
		submitComment();
	};

	return (
		<Box className={styles.commentContainer} marginBottom='4'>
			{session ? (
				<Flex className={styles.commentInputContainer}>
					<Box className={styles.userInfoContainer}>
						<Box
							as='img'
							src={user?.user_metadata?.avatar_url || '/default-avatar.png'}
							alt='User Avatar'
							className={styles.userAvatar}
						/>
						<Typography.SubText level={2}>
							{user?.user_metadata?.full_name ||
								user?.email?.split('@')[0] ||
								'User'}
						</Typography.SubText>
					</Box>
					<Box className={styles.textareaContainer}>
						<Textarea
							className={styles.textarea}
							placeholder='Write a comment...'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							rows={4}
						/>
						<Flex className={styles.buttonContainer}>
							<Button onClick={signOut} className={styles.signOutButton}>
								Sign Out
							</Button>
							<Button onClick={onSubmit} className={styles.submitButton}>
								Submit Comment
							</Button>
						</Flex>
					</Box>
				</Flex>
			) : (
				<>
					<Textarea
						className={styles.textarea}
						placeholder='Sign in to write a comment'
						disabled
						rows={4}
					/>
					<SocialLogin />
				</>
			)}
		</Box>
	);
};

export default CommentForm;
