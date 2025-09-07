import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { createDiscovery } from '../../../lib/discoveries';

const storage = new MMKV();
const KEY = 'learningLevel';

type DiscoveryParams = {
  object?: string;
};

type Level = 'elementary' | 'highschool' | 'college';

const mockContent: Record<string, { [K in Level]: string[] }> = {
  lemon: {
    elementary: ['Maasim dahil sa citric acid', 'pH ay sukat ng asim'],
    highschool: ['Citric acid (C6H8O7) weak acid', 'pH and dissociation constants'],
    college: ['Acid-base equilibria and buffer systems', 'Redox properties of ascorbic acid'],
  },
};

export default function DiscoveryScreen() {
  const { object } = useLocalSearchParams<DiscoveryParams>();
  const key = (object || 'lemon').toString().toLowerCase();
  const level = (storage.getString(KEY) as Level) || 'highschool';
  const entry = mockContent[key] || mockContent.lemon;

  const onSave = async () => {
    try {
      const row = await createDiscovery({ label: object?.toString() || 'lemon', level });
      console.log('Saved discovery:', row);
    } catch (e) {
      console.error('Save failed:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8 }}>
        STEM Concepts: {object || 'Lemon'}
      </Text>
      <Text style={{ fontSize: 16, opacity: 0.7, marginBottom: 8 }}>Level: {level}</Text>
      {entry[level].map((line) => (
        <Text key={line} style={{ marginBottom: 6 }}>
          • {line}
        </Text>
      ))}
      <Pressable onPress={onSave} style={{ marginTop: 12, padding: 12, backgroundColor: '#2563eb', borderRadius: 8 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Save to Supabase</Text>
      </Pressable>
    </ScrollView>
  );
}
