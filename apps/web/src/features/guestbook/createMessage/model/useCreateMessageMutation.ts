import { useTRPC } from '@/fsd/app';
import {
	type GuestbookColor,
	type GuestbookEmoji,
	MESSAGE_LIMIT,
} from '@/fsd/entities/guestbook';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import type { GuestbookMessage } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { createMessageAction } from '../api/createMessageAction';
import { validateGuestbookMessage } from '../lib/validateGuestbookMessage';

export const useCreateMessageMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const queryOptions = trpc.guestbook.getAllMessages.infiniteQueryOptions({
		limit: MESSAGE_LIMIT,
	});

	const rollbackOptimisticUpdate = (tempId: string) => {
		queryClient.setQueryData(queryOptions.queryKey, (oldData) => {
			if (!oldData) return oldData;
			return {
				...oldData,
				pages: oldData.pages.map((page) => ({
					...page,
					items: page.items.filter((item) => item.id !== tempId),
				})),
			};
		});
	};

	const mutateCreateMessage = async (formData: FormData) => {
		if (!user) {
			showToast('Please log in to create a message', 'error');
			return false;
		}

		const content = formData.get('message') as string;
		const emoji = formData.get('emoji') as GuestbookEmoji;
		const backgroundColor = formData.get('backgroundColor') as GuestbookColor;

		const validationResult = validateGuestbookMessage(
			content,
			emoji,
			backgroundColor,
		);

		if (!validationResult.isValid) {
			showToast(validationResult.error!, 'error');
			return false;
		}

		const tempId = `temp-${Date.now()}`;
		const optimisticMessage: GuestbookMessage = {
			id: tempId,
			content: content.trim(),
			emoji,
			background_color: backgroundColor,
			author_id: user.id,
			author_name: user.user_metadata.full_name,
			author_avatar: user.user_metadata.avatar_url,
			created_at: new Date().toISOString(),
		};

		try {
			// 데이터 먼저 확보
			await queryClient.ensureInfiniteQueryData(queryOptions);

			// 낙관적 업데이트 적용
			queryClient.setQueryData(queryOptions.queryKey, (oldData) => {
				if (!oldData) return { pages: [], pageParams: [] };
				const newPages = oldData.pages.map((page, index) => {
					if (index === 0) {
						return {
							...page,
							items: [optimisticMessage, ...page.items],
						};
					}
					return page;
				});
				return { ...oldData, pages: newPages };
			});

			const result = await createMessageAction(null, formData);

			if (!result.success) {
				rollbackOptimisticUpdate(tempId);
				showToast(result.error || 'Failed to create message', 'error');
				return false;
			}

			await queryClient.invalidateQueries(queryOptions);
			showToast('Message created successfully! ✨', 'success');

			return true;
		} catch (error) {
			// Rollback on error
			rollbackOptimisticUpdate(tempId);
			showToast('Failed to create message', 'error');
			return false;
		}
	};

	return mutateCreateMessage;
};
