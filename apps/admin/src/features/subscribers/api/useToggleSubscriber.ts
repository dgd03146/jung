import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriberKeys, supabase } from '@/fsd/shared';

interface ToggleParams {
	id: string;
	is_active: boolean;
}

const toggleSubscriber = async ({ id, is_active }: ToggleParams) => {
	const updateData: { is_active: boolean; unsubscribed_at: string | null } = {
		is_active,
		unsubscribed_at: is_active ? null : new Date().toISOString(),
	};

	const { error } = await supabase
		.from('subscribers')
		.update(updateData)
		.eq('id', id);

	if (error) throw error;
	return { id, is_active };
};

export const useToggleSubscriber = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: toggleSubscriber,
		onSuccess: async (_, { is_active }) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: subscriberKeys.lists(),
				}),
				queryClient.invalidateQueries({
					queryKey: subscriberKeys.stats(),
				}),
			]);
			showToast(
				is_active ? 'Subscriber activated' : 'Subscriber deactivated',
				'success',
			);
		},
		onError: () => {
			showToast('Failed to update subscriber status', 'error');
		},
	});
};
