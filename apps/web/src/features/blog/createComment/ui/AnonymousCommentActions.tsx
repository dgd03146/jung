'use client';

import {
	Box,
	Button,
	Flex,
	Textarea,
	useToast,
} from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeleteAnonymousCommentMutation } from '../model/useDeleteAnonymousCommentMutation';
import { useUpdateAnonymousCommentMutation } from '../model/useUpdateAnonymousCommentMutation';
import { PasswordModal } from './PasswordModal';

interface AnonymousCommentActionsProps {
	comment: Comment;
	postId: string;
	canShow: boolean;
}

type ModalMode = 'edit' | 'delete' | null;

/**
 * 비밀번호 검증 타이밍:
 * - Delete: 모달에서 비밀번호 입력 → 즉시 서버 검증 → 삭제
 * - Edit: 모달에서 비밀번호 입력 → 임시 저장 → UI 편집 모드 → 수정 완료 시 서버 검증
 */

const getPasswordStorageKey = (commentId: string) => `comment_pw_${commentId}`;

export const AnonymousCommentActions = ({
	comment,
	postId,
	canShow,
}: AnonymousCommentActionsProps) => {
	const showToast = useToast();

	const [modalMode, setModalMode] = useState<ModalMode>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(comment.content);
	const [error, setError] = useState<string | null>(null);

	const { mutate: updateComment, isPending: isUpdating } =
		useUpdateAnonymousCommentMutation();
	const { mutate: deleteComment, isPending: isDeleting } =
		useDeleteAnonymousCommentMutation();

	if (!canShow) return null;

	const handleEditClick = () => {
		setEditContent(comment.content);
		setModalMode('edit');
		setError(null);
	};

	const handleDeleteClick = () => {
		setModalMode('delete');
		setError(null);
	};

	const handleCloseModal = () => {
		setModalMode(null);
		setError(null);
	};

	const handlePasswordSubmit = (password: string) => {
		if (modalMode === 'edit') {
			// 비밀번호 임시 저장 후 편집 모드 진입 (서버 검증은 handleEditSubmit에서 수행)
			sessionStorage.setItem(getPasswordStorageKey(comment.id), password);
			setIsEditing(true);
			setModalMode(null);
		} else if (modalMode === 'delete') {
			// Delete: 즉시 서버 검증
			deleteComment(
				{
					commentId: comment.id,
					password,
					postId,
				},
				{
					onSuccess: () => {
						showToast('댓글이 삭제되었습니다.', 'success');
						handleCloseModal();
					},
					onError: (err) => {
						setError(err.message || '비밀번호가 일치하지 않습니다.');
					},
				},
			);
		}
	};

	const handleEditSubmit = () => {
		const password = sessionStorage.getItem(getPasswordStorageKey(comment.id));
		if (!password) {
			showToast('비밀번호 정보가 없습니다. 다시 시도해주세요.', 'error');
			setIsEditing(false);
			return;
		}

		updateComment(
			{
				commentId: comment.id,
				content: editContent,
				password,
				postId,
			},
			{
				onSuccess: () => {
					showToast('댓글이 수정되었습니다.', 'success');
					setIsEditing(false);
					sessionStorage.removeItem(getPasswordStorageKey(comment.id));
				},
				onError: (err) => {
					showToast(err.message || '댓글 수정에 실패했습니다.', 'error');
				},
			},
		);
	};

	const handleEditCancel = () => {
		setIsEditing(false);
		setEditContent(comment.content);
		sessionStorage.removeItem(getPasswordStorageKey(comment.id));
	};

	// 편집 모드일 때
	if (isEditing) {
		return (
			<Box marginTop='2'>
				<Textarea
					value={editContent}
					onChange={(e) => setEditContent(e.target.value)}
					rows={3}
					fontSize='sm'
					borderRadius='md'
					disabled={isUpdating}
				/>
				<Flex gap='2' justify='flex-end' marginTop='2'>
					<Button
						variant='ghost'
						fontSize='xs'
						onClick={handleEditCancel}
						disabled={isUpdating}
					>
						취소
					</Button>
					<Button
						variant='primary'
						fontSize='xs'
						onClick={handleEditSubmit}
						disabled={isUpdating || !editContent.trim()}
					>
						{isUpdating ? '수정 중...' : '수정'}
					</Button>
				</Flex>
			</Box>
		);
	}

	return (
		<>
			<Button variant='ghost' fontSize='xxs' onClick={handleEditClick}>
				<FaEdit size={12} style={{ marginRight: '4px' }} />
				Edit
			</Button>
			<Button
				variant='ghost'
				fontSize='xxs'
				onClick={handleDeleteClick}
				color='primary'
			>
				<FaTrash size={12} style={{ marginRight: '4px' }} />
				Delete
			</Button>

			<PasswordModal
				isOpen={modalMode !== null}
				onClose={handleCloseModal}
				onSubmit={handlePasswordSubmit}
				mode={modalMode || 'edit'}
				isPending={isDeleting}
				error={error}
			/>
		</>
	);
};
