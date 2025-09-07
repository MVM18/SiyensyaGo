import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const KEY = 'learningLevel';
const LEVELS = ['elementary', 'highschool', 'college'] as const;

type Level = typeof LEVELS[number];

export default function ProfileScreen() {
  const [level, setLevel] = useState<Level>('highschool');

  useEffect(() => {
    const saved = storage.getString(KEY) as Level | undefined;
    if (saved) setLevel(saved);
  }, []);

  const select = (value: Level) => {
    setLevel(value);
    storage.set(KEY, value);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Learning Level</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {LEVELS.map((lv) => (
          <Pressable
            key={lv}
            onPress={() => select(lv)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 16,
              backgroundColor: level === lv ? '#2563eb' : '#e5e7eb',
            }}
          >
            <Text style={{ color: level === lv ? '#fff' : '#111827' }}>{lv}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}


