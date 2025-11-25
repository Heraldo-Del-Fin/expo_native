import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import WeatherCard from '@/components/weather/weather-card';
import WeeklyChart from '@/components/charts/weekly-chart';
import Alerts from '@/components/alerts/Alerts';
import { fetchWeather } from '@/services/mockWeather';
import { getSavedLocation } from '@/services/locationService';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFocusEffect } from 'expo-router';

export default function HomeScreen() {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => { load() }, []);

  // Reload when screen comes into focus (in case location was changed)
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    setLoading(true);
    try {
      const savedLocation = await getSavedLocation();
      let location: any;

      if (savedLocation) {
        console.log('Using saved location:', savedLocation);
        if (savedLocation.type === 'coords' && savedLocation.coords) {
          location = savedLocation.coords;
        } else if (savedLocation.type === 'city' && savedLocation.city) {
          location = savedLocation.city;
        }
      }

      // Fallback to San Bernardo del Viento if no location saved
      if (!location) {
        console.log('No saved location, using default: San Bernardo del Viento');
        location = { lat: 9.44872, lon: -75.84347 };
      }

      console.log('Fetching weather for:', location);
      const w = await fetchWeather(location);
      setWeather(w);
      
      // Check if we're showing mock data (means API failed)
      if (w.location.includes('Datos de ejemplo')) {
        Alert.alert(
          'Aviso',
          'No se pudo obtener el clima real. Mostrando datos de ejemplo.\n\nVerifica:\n- Tu conexión a internet\n- Que la ubicación sea válida',
          [{ text: 'OK' }]
        );
      }
    } catch (e: any) {
      console.error('Error in load():', e);
      Alert.alert(
        'Error',
        'No se pudo cargar el clima. Revisa tu conexión a internet.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const savedLocation = await getSavedLocation();
      let location: any;

      if (savedLocation) {
        if (savedLocation.type === 'coords' && savedLocation.coords) {
          location = savedLocation.coords;
        } else if (savedLocation.type === 'city' && savedLocation.city) {
          location = savedLocation.city;
        }
      }

      if (!location) {
        location = { lat: 9.44872, lon: -75.84347 };
      }

      const w = await fetchWeather(location);
      setWeather(w);
    } catch (e) {
      console.warn(e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.tint}
          colors={[colors.tint]}
        />
      }
    >
      {loading && !weather ? (
        <Animated.View entering={FadeIn} style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </Animated.View>
      ) : weather ? (
        <View style={styles.inner}>
          <Animated.View entering={FadeInDown.delay(100).duration(600)}>
            <WeatherCard weather={weather} />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <Alerts weather={weather} />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <WeeklyChart data={weather.weeklyForecast} />
          </Animated.View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
  },
  inner: {
    padding: 12,
    paddingBottom: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
});
