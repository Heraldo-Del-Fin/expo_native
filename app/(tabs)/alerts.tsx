import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Alerts from '@/components/alerts/Alerts';
import { fetchWeather } from '@/services/mockWeather';
import { useEffect, useState } from 'react';

export default function AlertsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [weather, setWeather] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const w = await fetchWeather();
        setWeather(w);
      } catch (e) {
        console.warn(e);
      }
    }
    load();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.header, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>🚨 Alertas de Inundación</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Mantente informado sobre las condiciones de riesgo en tu área
        </Text>
      </View>

      {weather && (
        <View style={styles.alertsContainer}>
          <Alerts weather={weather} />
        </View>
      )}

      <View style={[styles.infoCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>ℹ️ Información</Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Las alertas se actualizan automáticamente basándose en los niveles de precipitación y ríos.
          Mantente atento a los comunicados oficiales de las autoridades locales.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  alertsContainer: {
    marginBottom: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

