import { supabase } from './supabase';

export async function createDiscovery({
	objectId,
	label,
	level,
}: {
	objectId?: number;
	label?: string;
	level: 'elementary' | 'highschool' | 'college';
}) {
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error('Not authenticated');

	const { data, error } = await supabase
		.from('discoveries')
		.insert({
			user_id: user.id,
			object_id: objectId ?? null,
			object_label: label ?? null,
			level,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}
