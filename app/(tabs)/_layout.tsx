import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AppHeader from '@/components/ui/app-header';
import NavBar from '@/components/navigation/NavBar';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}> 
      <AppHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="map" />
        <Tabs.Screen name="alerts" />
        <Tabs.Screen name="settings" />
        <Tabs.Screen name="explore" options={{ href: null }} />
      </Tabs>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // El color de fondo se maneja por el tema (colors.background)
  },
});
