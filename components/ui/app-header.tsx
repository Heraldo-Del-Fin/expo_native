import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './app-header.styles';

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>App Clima</Text>

        <View style={styles.right}>
          <Pressable onPress={() => setOpen((v) => !v)} style={styles.menuBtn}>
            <IconSymbol name="chevron.left.forwardslash.chevron.right" size={22} color={colors.icon} />
          </Pressable>
        </View>

        {open && (
          <View style={[styles.dropdown, { backgroundColor: colors.backgroundCard, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <TouchableOpacity onPress={() => { setOpen(false); console.warn('Abrir Ajustes'); }} style={styles.item}>
              <Text style={[styles.itemText, { color: colors.text }]}>Ajustes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setOpen(false); console.warn('Abrir Mapa'); }} style={styles.item}>
              <Text style={[styles.itemText, { color: colors.text }]}>Mapa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setOpen(false); console.warn('Acerca de'); }} style={styles.item}>
              <Text style={[styles.itemText, { color: colors.text }]}>Acerca de</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
