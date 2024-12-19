import { trpc } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import type { GuestbookMessage } from '@jung/shared/types';
import { createMessageAction } from '../api/actions/createMessageAction';
import type { GuestbookColor, GuestbookEmoji } from '../config';
import { validateGuestbookMessage } from '../lib/validateGuestbookMessage';

export const useOptimisticCreateMessage = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const mutateCreateMessage = async (formData: FormData) => {
		if (!user) {
			showToast('Please log in to create a message', 'error');
			return;
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

		utils.guestbook.getAllMessages.setInfiniteData({ limit: 9 }, (oldData) => {
			if (!oldData) return oldData;
			const firstPage = oldData.pages[0];
			if (!firstPage) return oldData;

			return {
				...oldData,
				pages: [
					{
						items: [optimisticMessage, ...firstPage.items],
						nextCursor: firstPage.nextCursor,
					},
					...oldData.pages.slice(1),
				],
			};
		});

		try {
			const result = await createMessageAction(null, formData);

			if (!result.success) {
				// throttling 등 서버 측 추가 validation 실패시 롤백
				utils.guestbook.getAllMessages.setInfiniteData(
					{ limit: 9 },
					(oldData) => {
						if (!oldData) return oldData;
						return {
							...oldData,
							pages: oldData.pages.map((page) => ({
								...page,
								items: page.items.filter((item) => item.id !== tempId),
							})),
						};
					},
				);

				showToast(result.error || 'Failed to create message', 'error');
				return false;
			}

			showToast('Message created successfully! ✨', 'success');
			return true;
		} catch (error) {
			// 서버 에러시 롤백
			utils.guestbook.getAllMessages.setInfiniteData(
				{ limit: 9 },
				(oldData) => {
					if (!oldData) return oldData;
					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							items: page.items.filter((item) => item.id !== tempId),
						})),
					};
				},
			);

			showToast('Failed to create message', 'error');
			return false;
		}
	};

	return mutateCreateMessage;
};
