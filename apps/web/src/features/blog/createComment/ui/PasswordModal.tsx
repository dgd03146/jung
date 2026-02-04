'use client';

import {
	Box,
	Button,
	Flex,
	Input,
	Typography,
} from '@jung/design-system/components';
import { useState } from 'react';
import { Modal } from '@/fsd/shared';

interface PasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (password: string) => void;
	mode: 'edit' | 'delete';
	isPending: boolean;
	error?: string | null;
}

export const PasswordModal = ({
	isOpen,
	onClose,
	onSubmit,
	mode,
	isPending,
	error,
}: PasswordModalProps) => {
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password.trim()) {
			onSubmit(password);
		}
	};

	const handleClose = () => {
		setPassword('');
		onClose();
	};

	const title = mode === 'edit' ? '댓글 수정' : '댓글 삭제';
	const description =
		mode === 'edit'
			? '댓글을 수정하려면 비밀번호를 입력하세요.'
			: '댓글을 삭제하려면 비밀번호를 입력하세요.';
	const submitText = mode === 'edit' ? '확인' : '삭제';

	if (!isOpen) return null;

	return (
		<Modal onClose={handleClose} variant='share' showCloseButton={false}>
			<Box padding='6' background='white' borderRadius='lg'>
				<Typography.Text level={2} fontWeight='semibold' marginBottom='2'>
					{title}
				</Typography.Text>
				<Typography.SubText level={2} color='gray100' marginBottom='4'>
					{description}
				</Typography.SubText>

				<form onSubmit={handleSubmit}>
					<Input
						aria-label='비밀번호'
						type='password'
						placeholder='비밀번호'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isPending}
						autoFocus
					/>

					{error && (
						<Typography.SubText level={3} color='primary' marginTop='2'>
							{error}
						</Typography.SubText>
					)}

					<Flex gap='2' justify='flex-end' marginTop='4'>
						<Button
							type='button'
							variant='ghost'
							onClick={handleClose}
							disabled={isPending}
						>
							취소
						</Button>
						<Button
							type='submit'
							variant={mode === 'delete' ? 'outline' : 'primary'}
							disabled={isPending || !password.trim()}
						>
							{isPending ? '처리 중...' : submitText}
						</Button>
					</Flex>
				</form>
			</Box>
		</Modal>
	);
};
