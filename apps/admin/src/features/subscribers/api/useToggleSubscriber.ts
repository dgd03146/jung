import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/fsd/shared';
import { subscriberQueryOptions } from './subscriberQueryOptions';

interface ToggleParams {
	id: string;
	is_active: boolean;
}

const buildToggleUpdateData = (is_active: boolean) => {
	const shouldClearUnsubscribeDate = is_active;

	return {
		is_active,
		unsubscribed_at: shouldClearUnsubscribeDate
			? null
			: new Date().toISOString(),
	};
};

const toggleSubscriber = async ({ id, is_active }: ToggleParams) => {
	const updateData = buildToggleUpdateData(is_active);

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
					queryKey: subscriberQueryOptions.lists(),
				}),
				queryClient.invalidateQueries({
					queryKey: subscriberQueryOptions.stats().queryKey,
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
