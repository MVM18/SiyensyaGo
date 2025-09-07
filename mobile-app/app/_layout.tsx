import { Stack } from 'expo-router';
import '../i18n';
import { useEffect } from 'react';
import { ensureSessionAndProfile } from '../lib/auth';

export default function RootLayout() {
  useEffect(() => {
    ensureSessionAndProfile().catch(console.error);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}


