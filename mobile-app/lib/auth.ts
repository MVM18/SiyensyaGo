import { supabase } from '../lib/supabase';

export async function ensureSessionAndProfile() {
	const { data: userRes } = await supabase.auth.getUser();
	if (!userRes.user) {
		const { error } = await supabase.auth.signInAnonymously();
		if (error) throw error;
	}
	const { data: { user } } = await supabase.auth.getUser();
	if (!user) throw new Error('No user after sign-in');

	const { error: upsertError } = await supabase
		.from('profiles')
		.upsert({
			id: user.id,
			display_name: `Guest-${user.id.slice(0, 6)}`,
			learning_level: 'highschool',
			role: 'student',
		}, { onConflict: 'id' });

	if (upsertError) throw upsertError;
	return user;
}
