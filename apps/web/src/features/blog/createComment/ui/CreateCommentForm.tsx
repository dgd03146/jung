'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { GuestCommentForm } from './GuestCommentForm';
import { LoggedInCommentForm } from './LoggedInCommentForm';

interface CreateCommentFormProps {
	postId: string;
	parentId?: string;
	isReply?: boolean;
	postTitle: string;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const CreateCommentForm = ({
	postId,
	postTitle,
	parentId,
	isReply = false,
	onSuccess,
	onCancel,
}: CreateCommentFormProps) => {
	const { session, user, signOut } = useSupabaseAuth();

	if (!session || !user) {
		return <GuestCommentForm isReply={isReply} />;
	}

	return (
		<LoggedInCommentForm
			postId={postId}
			postTitle={postTitle}
			user={user}
			parentId={parentId}
			isReply={isReply}
			onSuccess={onSuccess}
			onCancel={onCancel}
			onSignOut={signOut}
		/>
	);
};
