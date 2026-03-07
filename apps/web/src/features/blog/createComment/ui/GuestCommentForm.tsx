'use client';

import {
	Box,
	Button,
	Flex,
	Input,
	Textarea,
	useToast,
} from '@jung/design-system/components';
import { useAnonymousId } from '@jung/shared/hooks';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import { GUEST_COMMENT } from '@/fsd/entities/blog';
import { useSocialLogin } from '@/fsd/features/auth';
import { useTrackEvent } from '@/fsd/shared';
import { useCreateAnonymousCommentMutation } from '../model/useCreateAnonymousCommentMutation';
import * as styles from './CreateCommentForm.css';

interface GuestCommentFormProps {
	postId: string;
	parentId?: string;
	isReply?: boolean;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const GuestCommentForm = ({
	postId,
	parentId,
	isReply = false,
	onSuccess,
	onCancel,
}: GuestCommentFormProps) => {
	const { anonymousId, isLoading: isIdLoading } = useAnonymousId();
	const showToast = useToast();
	const { handleSocialLogin } = useSocialLogin();
	const pathname = usePathname();

	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [content, setContent] = useState('');

	const { mutate: createComment, isPending } =
		useCreateAnonymousCommentMutation();
	const { trackEvent } = useTrackEvent();

	const handleSubmit = () => {
		if (!anonymousId) {
			showToast('Please try again later.', 'error');
			return;
		}

		if (!nickname.trim()) {
			showToast('Please enter a nickname.', 'warning');
			return;
		}

		if (password.length < GUEST_COMMENT.PASSWORD_MIN_LENGTH) {
			showToast(
				`Password must be at least ${GUEST_COMMENT.PASSWORD_MIN_LENGTH} characters.`,
				'warning',
			);
			return;
		}

		if (!content.trim()) {
			showToast('Please enter a comment.', 'warning');
			return;
		}

		trackEvent({
			event_name: 'create_comment',
			event_category: 'engagement',
			resource_type: 'post',
			resource_id: postId,
			properties: { is_reply: !!parentId, is_anonymous: true },
		});

		createComment(
			{
				postId,
				content: content.trim(),
				anonymousId,
				nickname: nickname.trim(),
				password,
				parentId,
			},
			{
				onSuccess: () => {
					setContent('');
					showToast('Comment posted!', 'success');
					onSuccess?.();
				},
				onError: (error) => {
					showToast(error.message || 'Failed to post comment.', 'error');
				},
			},
		);
	};

	return (
		<Box
			className={
				isReply ? styles.nestedCommentContainer : styles.commentContainer
			}
			marginBottom='4'
		>
			<Flex gap='2' marginBottom='3'>
				<Input
					aria-label='Nickname (required)'
					placeholder='Nickname *'
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					maxLength={GUEST_COMMENT.NICKNAME_MAX_LENGTH}
					fontSize='xs'
					borderRadius='md'
					disabled={isPending}
				/>
				<Input
					aria-label='Password (required, for edit/delete)'
					type='password'
					placeholder='Password * (for edit/delete)'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					maxLength={GUEST_COMMENT.PASSWORD_MAX_LENGTH}
					fontSize='xs'
					borderRadius='md'
					disabled={isPending}
				/>
			</Flex>
			<Textarea
				aria-label='Comment content'
				borderRadius='md'
				fontSize='xs'
				placeholder='Write a comment...'
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={4}
				disabled={isPending}
			/>
			<Flex justify='space-between' align='center' marginTop='2'>
				<Flex align='center' gap='1'>
					<button
						type='button'
						className={styles.socialIconButton}
						onClick={() =>
							handleSocialLogin('google', { redirectTo: pathname })
						}
						aria-label='Sign in with Google'
					>
						<FcGoogle size={16} />
					</button>
					<button
						type='button'
						className={styles.kakaoIconButton}
						onClick={() => handleSocialLogin('kakao', { redirectTo: pathname })}
						aria-label='Sign in with Kakao'
					>
						<SiKakaotalk size={14} />
					</button>
					<button
						type='button'
						className={styles.githubIconButton}
						onClick={() =>
							handleSocialLogin('github', { redirectTo: pathname })
						}
						aria-label='Sign in with GitHub'
					>
						<VscGithub size={14} />
					</button>
				</Flex>
				<Flex gap='2'>
					{isReply && onCancel && (
						<Button
							variant='ghost'
							fontSize='xs'
							borderRadius='md'
							onClick={onCancel}
							disabled={isPending}
						>
							Cancel
						</Button>
					)}
					<Button
						variant='primary'
						fontSize='xs'
						borderRadius='md'
						onClick={handleSubmit}
						disabled={isPending || isIdLoading || !content.trim()}
					>
						{isPending ? 'Posting...' : 'Submit'}
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};
