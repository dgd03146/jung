import { useToast } from '@jung/design-system/components';
import { useAnonymousId } from '@jung/shared/hooks';
import type { GuestbookMessage } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import {
	type GuestbookColor,
	type GuestbookEmoji,
	MESSAGE_LIMIT,
} from '@/fsd/entities/guestbook';

interface CreateAnonymousMessageInput {
	content: string;
	backgroundColor: GuestbookColor;
	emoji: GuestbookEmoji;
	nickname: string;
}

type CreateAnonymousMessageVariables = {
	content: string;
	backgroundColor?: string;
	emoji?: string;
	anonymousId: string;
	nickname: string;
};

export const useCreateAnonymousMessageMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const showToast = useToast();
	const { anonymousId } = useAnonymousId();

	const queryOptions = trpc.guestbook.getAllMessages.infiniteQueryOptions({
		limit: MESSAGE_LIMIT,
	});

	const mutation = useMutation(
		trpc.guestbook.createAnonymousMessage.mutationOptions({
			onMutate: async (variables: CreateAnonymousMessageVariables) => {
				await queryClient.cancelQueries(queryOptions);

				const previousData = queryClient.getQueryData(queryOptions.queryKey);

				const tempId = `temp-${Date.now()}`;
				const optimisticMessage: GuestbookMessage = {
					id: tempId,
					content: variables.content.trim(),
					emoji: variables.emoji,
					background_color: variables.backgroundColor,
					author_id: null,
					author_name: variables.nickname,
					author_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${variables.anonymousId}`,
					created_at: new Date().toISOString(),
					anonymous_id: variables.anonymousId,
					is_anonymous: true,
				};

				queryClient.setQueryData(queryOptions.queryKey, (oldData) => {
					if (!oldData) return { pages: [], pageParams: [] };
					return {
						...oldData,
						pages: oldData.pages.map((page, index) => {
							if (index === 0) {
								return {
									...page,
									items: [optimisticMessage, ...page.items],
								};
							}
							return page;
						}),
					};
				});

				return { previousData, tempId };
			},
			onError: (_error, _variables, context) => {
				if (context?.previousData) {
					queryClient.setQueryData(queryOptions.queryKey, context.previousData);
				}
				showToast('메시지 작성에 실패했습니다', 'error');
			},
			onSuccess: () => {
				showToast('메시지가 등록되었습니다! ✨', 'success');
			},
			onSettled: () => {
				queryClient.invalidateQueries(queryOptions);
			},
		}),
	);

	const mutate = (
		input: CreateAnonymousMessageInput,
		options?: { onSuccess?: () => void },
	) => {
		if (!anonymousId) {
			showToast('익명 ID를 생성할 수 없습니다', 'error');
			return;
		}

		mutation.mutate(
			{
				content: input.content,
				backgroundColor: input.backgroundColor,
				emoji: input.emoji,
				anonymousId,
				nickname: input.nickname,
			},
			{
				onSuccess: options?.onSuccess,
			},
		);
	};

	return {
		mutate,
		isPending: mutation.isPending,
	};
};
