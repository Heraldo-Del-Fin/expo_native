import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getSavedLocation } from '@/services/locationService';

type MapLayer = 'temp' | 'wind' | 'precipitation';

const OPENWEATHER_API_KEY = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY || '1bf8844badbd0bb228b57e8d43c13eeb';

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedLayer, setSelectedLayer] = useState<MapLayer>('temp');
  const [region, setRegion] = useState({
    latitude: 9.44872,
    longitude: -75.84347,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserLocation();
  }, []);

  async function loadUserLocation() {
    const savedLocation = await getSavedLocation();
    if (savedLocation?.coords) {
      setRegion({
        latitude: savedLocation.coords.lat,
        longitude: savedLocation.coords.lon,
        latitudeDelta: 5,
        longitudeDelta: 5,
      });
    }
    setLoading(false);
  }

  const mapLayers: Record<MapLayer, { name: string; icon: keyof typeof Ionicons.glyphMap; layer: string; description: string }> = {
    temp: {
      name: 'Temperatura',
      icon: 'thermometer',
      layer: 'temp_new',
      description: 'Mapa de temperatura en tiempo real',
    },
    wind: {
      name: 'Viento',
      icon: 'flag',
      layer: 'wind_new',
      description: 'Velocidad y dirección del viento',
    },
    precipitation: {
      name: 'Precipitación',
      icon: 'rainy',
      layer: 'precipitation_new',
      description: 'Lluvia y tormentas actuales',
    },
  };

  const getTileUrl = (layer: string) => {
    return `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Map Layer Selector */}
      <View style={[styles.header, { backgroundColor: colors.backgroundCard }]}>
        <Text style={[styles.title, { color: colors.text }]}>🗺️ Mapas Meteorológicos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.layerSelector}>
          {(Object.keys(mapLayers) as MapLayer[]).map((key) => {
            const layer = mapLayers[key];
            const isSelected = selectedLayer === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.layerButton,
                  {
                    backgroundColor: isSelected ? colors.tint : colors.skyBlue,
                    borderColor: isSelected ? colors.tint : colors.border,
                  },
                ]}
                onPress={() => setSelectedLayer(key)}
              >
                <Ionicons
                  name={layer.icon}
                  size={20}
                  color={isSelected ? '#fff' : colors.text}
                />
                <Text
                  style={[
                    styles.layerButtonText,
                    { color: isSelected ? '#fff' : colors.text },
                  ]}
                >
                  {layer.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {mapLayers[selectedLayer].description}
        </Text>
      </View>

      {/* Map View */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Cargando mapa...</Text>
        </View>
      ) : (
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton
        >
          <UrlTile
            urlTemplate={getTileUrl(mapLayers[selectedLayer].layer)}
            maximumZ={19}
            flipY={false}
            zIndex={1}
          />
        </MapView>
      )}

      {/* Legend */}
      <View style={[styles.legend, { backgroundColor: colors.backgroundCard }]}>
        <Ionicons name="information-circle" size={16} color={colors.tint} />
        <Text style={[styles.legendText, { color: colors.textSecondary }]}>
          {selectedLayer === 'temp' && 'Colores: Azul (frío) → Rojo (caliente)'}
          {selectedLayer === 'wind' && 'Líneas muestran dirección y velocidad del viento'}
          {selectedLayer === 'precipitation' && 'Intensidad de lluvia: Azul claro → Azul oscuro'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  layerSelector: {
    marginBottom: 12,
  },
  layerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    gap: 6,
  },
  layerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  legendText: {
    flex: 1,
    fontSize: 11,
  },
});

