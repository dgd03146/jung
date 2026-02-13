import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { articleKeys } from '@/fsd/shared';

export const useSendNewsletter = () => {
	const showToast = useToast();
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.newsletter.sendNewsletter.mutationOptions({
			onSuccess: (data) => {
				if (data.failedCount === 0) {
					showToast(
						`Newsletter sent to ${data.sentCount} subscribers!`,
						'success',
					);
				} else {
					showToast(
						`Sent: ${data.sentCount}, Failed: ${data.failedCount}`,
						'error',
					);
				}
			},
			onError: (error) => {
				console.error('Newsletter send error:', error);
				showToast('Failed to send newsletter. Please try again.', 'error');
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
			},
		}),
	);
};
