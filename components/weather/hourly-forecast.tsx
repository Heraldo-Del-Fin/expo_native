import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function getWeatherIcon(icon: string): keyof typeof Ionicons.glyphMap {
  if (icon.includes('🌧️') || icon.includes('rain')) return 'rainy';
  if (icon.includes('🌦️') || icon.includes('cloud-rain')) return 'rainy';
  if (icon.includes('☁️') || icon.includes('cloud')) return 'cloudy';
  if (icon.includes('⛅') || icon.includes('partly')) return 'partly-sunny';
  if (icon.includes('🌤️') || icon.includes('sun-cloud')) return 'partly-sunny-outline';
  if (icon.includes('🌥️')) return 'cloudy-outline';
  if (icon.includes('☀️') || icon.includes('sun')) return 'sunny';
  return 'partly-sunny';
}

export default function HourlyForecast({ hourly }: { hourly: Array<{ time: string; tempC: number; icon: string }> }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (!hourly || !hourly.length) return null;

  return (
    <View style={styles.outer}>
      <View style={styles.header}>
        <Ionicons name="time" size={18} color={colors.tint} />
        <Text style={[styles.title, { color: colors.text }]}>Pronóstico horario</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {hourly.map((h, i) => {
          const weatherIcon = getWeatherIcon(h.icon);
          return (
            <Animated.View
              key={i}
              entering={FadeInRight.delay(i * 50).duration(400)}
              style={[
                styles.hourCard,
                {
                  backgroundColor: colors.backgroundCard,
                  borderColor: colors.border,
                  shadowColor: colors.shadow,
                },
              ]}
            >
              <Text style={[styles.hourTime, { color: colors.textSecondary }]}>{h.time}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name={weatherIcon} size={24} color={colors.tint} />
              </View>
              <Text style={[styles.hourTemp, { color: colors.text }]}>{h.tempC}°</Text>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  list: {},
  listContent: {
    paddingHorizontal: 12,
    paddingRight: 12,
  },
  hourCard: {
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 70,
    marginRight: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  hourTime: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconContainer: {
    marginVertical: 6,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourTemp: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
});
