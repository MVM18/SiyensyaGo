import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

function coerce(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	if (!trimmed || trimmed.toLowerCase() === 'undefined' || trimmed.toLowerCase() === 'null') return undefined;
	return trimmed;
}

// Prefer Expo public env vars (native and web), fallback to app.json extra
const fromEnvUrl = coerce(process.env.EXPO_PUBLIC_SUPABASE_URL);
const fromEnvKey = coerce(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
const fromExtra = (Constants.expoConfig?.extra as any) || {};
const fromExtraUrl = coerce(fromExtra?.supabaseUrl);
const fromExtraKey = coerce(fromExtra?.supabaseAnonKey);

const supabaseUrl = fromEnvUrl ?? fromExtraUrl;
const supabaseAnonKey = fromEnvKey ?? fromExtraKey;

if (!supabaseUrl) {
	throw new Error('supabaseUrl is required. Set EXPO_PUBLIC_SUPABASE_URL or app.json extra.supabaseUrl');
}
if (!supabaseAnonKey) {
	throw new Error('supabaseAnonKey is required. Set EXPO_PUBLIC_SUPABASE_ANON_KEY or app.json extra.supabaseAnonKey');
}

// Validate URL format early to avoid cryptic runtime errors
try {
	// eslint-disable-next-line no-new
	new URL(supabaseUrl);
} catch (e) {
	console.error('URL validation failed:', {
		supabaseUrl,
		length: supabaseUrl?.length,
		fromEnvUrl,
		fromExtraUrl,
		fromExtra: fromExtra?.supabaseUrl
	});
	throw new Error(`supabaseUrl is not a valid URL: "${supabaseUrl}" (length: ${supabaseUrl?.length})`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
});