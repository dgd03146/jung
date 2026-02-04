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
import { useState } from 'react';
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

	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [content, setContent] = useState('');

	const { mutate: createComment, isPending } =
		useCreateAnonymousCommentMutation();

	const handleSubmit = () => {
		if (!anonymousId) {
			showToast('잠시 후 다시 시도해주세요.', 'error');
			return;
		}

		if (!nickname.trim()) {
			showToast('닉네임을 입력해주세요.', 'warning');
			return;
		}

		if (password.length < 4) {
			showToast('비밀번호는 4자 이상 입력해주세요.', 'warning');
			return;
		}

		if (!content.trim()) {
			showToast('댓글 내용을 입력해주세요.', 'warning');
			return;
		}

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
					showToast('댓글이 등록되었습니다.', 'success');
					onSuccess?.();
				},
				onError: (error) => {
					showToast(error.message || '댓글 등록에 실패했습니다.', 'error');
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
					aria-label='닉네임 (필수)'
					placeholder='닉네임 *'
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					maxLength={20}
					fontSize='sm'
					borderRadius='md'
					disabled={isPending}
				/>
				<Input
					aria-label='비밀번호 (필수, 수정/삭제용)'
					type='password'
					placeholder='비밀번호 * (수정/삭제용)'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					maxLength={20}
					fontSize='sm'
					borderRadius='md'
					disabled={isPending}
				/>
			</Flex>
			<Textarea
				aria-label='댓글 내용'
				borderRadius='md'
				fontSize='sm'
				placeholder='댓글을 입력하세요...'
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={4}
				disabled={isPending}
			/>
			<Flex justify='flex-end' marginTop='2' gap='2'>
				{isReply && onCancel && (
					<Button
						variant='ghost'
						fontSize='sm'
						borderRadius='md'
						onClick={onCancel}
						disabled={isPending}
					>
						취소
					</Button>
				)}
				<Button
					variant='primary'
					fontSize='sm'
					borderRadius='md'
					onClick={handleSubmit}
					disabled={isPending || isIdLoading || !content.trim()}
				>
					{isPending ? '등록 중...' : '댓글 등록'}
				</Button>
			</Flex>
		</Box>
	);
};
