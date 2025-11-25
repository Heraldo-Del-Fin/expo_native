import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { FadeInRight, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './weather-card.styles';

type Hour = { time: string; tempC: number; icon: string };
type Weather = {
  location: string;
  temperatureC: number;
  description: string;
  precipitationMm: number;
  riverLevelM: number;
  humidity?: number;
  windKph?: number;
  condition?: { text: string; icon: string };
  floodAlerts: string[];
  hourlyForecast: Hour[];
};

function getWeatherIconFromString(icon: string): keyof typeof Ionicons.glyphMap {
  if (icon.includes('🌧️') || icon.includes('rain')) return 'rainy';
  if (icon.includes('🌦️') || icon.includes('cloud-rain')) return 'rainy';
  if (icon.includes('☁️') || icon.includes('cloud')) return 'cloudy';
  if (icon.includes('⛅') || icon.includes('partly')) return 'partly-sunny';
  if (icon.includes('🌤️') || icon.includes('sun-cloud')) return 'partly-sunny-outline';
  if (icon.includes('🌥️')) return 'cloudy-outline';
  if (icon.includes('☀️') || icon.includes('sun')) return 'sunny';
  return 'partly-sunny';
}

function floodRisk(weather: Weather) {
  return weather.precipitationMm > 30 || weather.riverLevelM > 2.5;
}

function getWeatherIcon(condition?: { text: string; icon: string }): keyof typeof Ionicons.glyphMap {
  if (!condition) return 'partly-sunny';
  const text = condition.text.toLowerCase();
  if (text.includes('rain') || text.includes('lluvia')) return 'rainy';
  if (text.includes('cloud') || text.includes('nublado')) return 'cloudy';
  if (text.includes('sun') || text.includes('soleado')) return 'sunny';
  if (text.includes('storm') || text.includes('tormenta')) return 'thunderstorm';
  return 'partly-sunny';
}

export default function WeatherCard({ weather }: { weather: Weather }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const risk = floodRisk(weather);
  const weatherIcon = getWeatherIcon(weather.condition);

  return (
    <Animated.View
      entering={FadeInRight.duration(500)}
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundCard,
          borderColor: risk ? colors.danger : colors.border,
          shadowColor: colors.shadow,
        },
        risk && { borderLeftWidth: 5, borderLeftColor: colors.danger },
      ]}
    >
      {/* Sección principal: Ubicación y Temperatura */}
      <View style={styles.mainSection}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={20} color={colors.tint} style={styles.locationIcon} />
          <Text style={[styles.location, { color: colors.text }]}>{weather.location}</Text>
        </View>
        <View style={styles.tempSection}>
          <View style={styles.tempMain}>
            <Ionicons name={weatherIcon} size={80} color={colors.tint} style={styles.mainIcon} />
            <View style={styles.tempInfo}>
              <Text style={[styles.tempLarge, { color: colors.text }]}>{weather.temperatureC.toFixed(1)}°</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{weather.description}</Text>
              <View style={styles.feelsLikeRow}>
                <Ionicons name="thermometer" size={14} color={colors.textSecondary} />
                <Text style={[styles.tempSub, { color: colors.textSecondary }]}>
                  Sensación {Math.round(weather.temperatureC)}°
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Pronóstico Horario */}
      {weather.hourlyForecast && weather.hourlyForecast.length > 0 && (
        <View style={styles.hourlySection}>
          <View style={styles.hourlyHeader}>
            <Ionicons name="time" size={18} color={colors.tint} />
            <Text style={[styles.hourlyTitle, { color: colors.text }]}>Pronóstico horario</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hourlyList}
            contentContainerStyle={styles.hourlyListContent}
          >
            {weather.hourlyForecast.map((h, i) => {
              const hourIcon = getWeatherIconFromString(h.icon);
              return (
                <Animated.View
                  key={i}
                  entering={FadeInRight.delay(i * 50).duration(400)}
                  style={[
                    styles.hourCard,
                    {
                      backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight,
                      borderColor: colors.border,
                      shadowColor: colors.shadow,
                    },
                  ]}
                >
                  <Text style={[styles.hourTime, { color: colors.textSecondary }]}>{h.time}</Text>
                  <View style={styles.hourIconContainer}>
                    <Ionicons name={hourIcon} size={24} color={colors.tint} />
                  </View>
                  <Text style={[styles.hourTemp, { color: colors.text }]}>{h.tempC}°</Text>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
      )}

      <View style={styles.metrics}>
        <Animated.View
          entering={FadeIn.delay(100).duration(400)}
          style={[styles.metricCard, { backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight, borderColor: colors.border }]}
        >
          <Ionicons name="water" size={16} color={colors.tint} />
          <View style={styles.metricContent}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Precipitación</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{weather.precipitationMm} mm</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(200).duration(400)}
          style={[styles.metricCard, { backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight, borderColor: colors.border }]}
        >
          <Ionicons name="water-outline" size={16} color={colors.tint} />
          <View style={styles.metricContent}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Humedad</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{weather.humidity}%</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(300).duration(400)}
          style={[styles.metricCard, { backgroundColor: (colors as any).blueLevel2 || colors.skyBlueLight, borderColor: colors.border }]}
        >
          <Ionicons name="leaf" size={16} color={colors.tint} />
          <View style={styles.metricContent}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Viento</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{weather.windKph} km/h</Text>
          </View>
        </Animated.View>
      </View>

    </Animated.View>
  );
}
