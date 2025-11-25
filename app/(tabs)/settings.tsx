import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  getCurrentLocation, 
  getLocationName, 
  saveLocation, 
  getSavedLocation,
  SavedLocation 
} from '@/services/locationService';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [manualCity, setManualCity] = useState('');
  const [manualLat, setManualLat] = useState('');
  const [manualLon, setManualLon] = useState('');

  useEffect(() => {
    loadSavedLocation();
  }, []);

  async function loadSavedLocation() {
    const saved = await getSavedLocation();
    setSavedLocation(saved);
  }

  async function handleUseCurrentLocation() {
    setLoadingLocation(true);
    const coords = await getCurrentLocation();
    if (coords) {
      const name = await getLocationName(coords.lat, coords.lon);
      const location: SavedLocation = {
        type: 'coords',
        coords,
        name,
      };
      await saveLocation(location);
      setSavedLocation(location);
      Alert.alert('Ubicación guardada', `Usando ubicación actual: ${name}`);
    } else {
      Alert.alert('Error', 'No se pudo obtener la ubicación actual. Verifica los permisos.');
    }
    setLoadingLocation(false);
    setShowLocationModal(false);
  }

  async function handleSaveCity() {
    if (!manualCity.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad');
      return;
    }
    const location: SavedLocation = {
      type: 'city',
      city: manualCity.trim(),
      name: manualCity.trim(),
    };
    await saveLocation(location);
    setSavedLocation(location);
    Alert.alert('Ubicación guardada', `Usando ciudad: ${manualCity}`);
    setShowLocationModal(false);
    setManualCity('');
  }

  async function handleSaveCoords() {
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);
    
    if (isNaN(lat) || isNaN(lon)) {
      Alert.alert('Error', 'Por favor ingresa coordenadas válidas');
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      Alert.alert('Error', 'Coordenadas fuera de rango válido');
      return;
    }

    const name = await getLocationName(lat, lon);
    const location: SavedLocation = {
      type: 'coords',
      coords: { lat, lon },
      name,
    };
    await saveLocation(location);
    setSavedLocation(location);
    Alert.alert('Ubicación guardada', `Coordenadas guardadas: ${name}`);
    setShowLocationModal(false);
    setManualLat('');
    setManualLon('');
  }

  const settingsItems: Array<{
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    type: 'switch' | 'navigation' | 'action';
    value?: boolean;
    onToggle?: (value: boolean) => void;
    onPress?: () => void;
  }> = [
    {
      icon: 'moon-outline',
      title: 'Tema Oscuro',
      subtitle: theme === 'dark' ? 'Activado' : 'Desactivado',
      type: 'switch',
      value: theme === 'dark',
      onToggle: () => toggleTheme(),
    },
    {
      icon: 'location-outline',
      title: 'Ubicación',
      subtitle: savedLocation ? savedLocation.name : 'No configurada',
      type: 'action',
      onPress: () => setShowLocationModal(true),
    },
    {
      icon: 'notifications-outline',
      title: 'Notificaciones',
      subtitle: 'Alertas y recordatorios',
      type: 'switch',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: 'language-outline',
      title: 'Idioma',
      subtitle: 'Español',
      type: 'navigation',
    },
    {
      icon: 'thermometer-outline',
      title: 'Unidades',
      subtitle: 'Celsius',
      type: 'navigation',
    },
    {
      icon: 'information-circle-outline',
      title: 'Acerca de',
      subtitle: 'Versión 1.0.0',
      type: 'navigation',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.header, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>⚙️ Ajustes</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Personaliza tu experiencia en la app
        </Text>
      </View>

      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.settingItem,
            { backgroundColor: colors.backgroundCard, borderColor: colors.border },
          ]}
          onPress={item.onPress}
          disabled={item.type === 'switch' || item.type === 'navigation'}
        >
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.tint + '20' }]}>
              <Ionicons name={item.icon} size={20} color={colors.tint} />
            </View>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                {item.subtitle}
              </Text>
            </View>
          </View>
          {item.type === 'switch' ? (
            <Switch
              value={item.value ?? false}
              onValueChange={item.onToggle || (() => {})}
              trackColor={{ false: colors.border, true: colors.tint + '80' }}
              thumbColor={item.value ? colors.tint : colors.textSecondary}
            />
          ) : (
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>
      ))}

      {/* Location Configuration Modal */}
      {showLocationModal && (
        <View style={[styles.modal, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.backgroundCard }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Configurar Ubicación</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Current Location Button */}
            <TouchableOpacity
              style={[styles.locationOption, { backgroundColor: colors.skyBlue, borderColor: colors.border }]}
              onPress={handleUseCurrentLocation}
              disabled={loadingLocation}
            >
              <Ionicons name="navigate" size={24} color={colors.tint} />
              <View style={styles.locationOptionText}>
                <Text style={[styles.locationOptionTitle, { color: colors.text }]}>
                  Usar Ubicación Actual
                </Text>
                <Text style={[styles.locationOptionSubtitle, { color: colors.textSecondary }]}>
                  Usa GPS para obtener tu ubicación
                </Text>
              </View>
              {loadingLocation && <ActivityIndicator color={colors.tint} />}
            </TouchableOpacity>

            {/* Manual City Input */}
            <View style={[styles.locationOption, { backgroundColor: colors.skyBlue, borderColor: colors.border }]}>
              <Ionicons name="search" size={24} color={colors.tint} />
              <View style={styles.locationOptionText}>
                <Text style={[styles.locationOptionTitle, { color: colors.text }]}>
                  Buscar Ciudad
                </Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Ej: Cartagena, Bogotá"
                  placeholderTextColor={colors.textSecondary}
                  value={manualCity}
                  onChangeText={setManualCity}
                />
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: colors.tint }]}
                  onPress={handleSaveCity}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Manual Coordinates Input */}
            <View style={[styles.locationOption, { backgroundColor: colors.skyBlue, borderColor: colors.border }]}>
              <Ionicons name="pin" size={24} color={colors.tint} />
              <View style={styles.locationOptionText}>
                <Text style={[styles.locationOptionTitle, { color: colors.text }]}>
                  Coordenadas Manuales
                </Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Latitud (ej: 9.44872)"
                  placeholderTextColor={colors.textSecondary}
                  value={manualLat}
                  onChangeText={setManualLat}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, marginTop: 8 }]}
                  placeholder="Longitud (ej: -75.84347)"
                  placeholderTextColor={colors.textSecondary}
                  value={manualLon}
                  onChangeText={setManualLon}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: colors.tint }]}
                  onPress={handleSaveCoords}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  locationOption: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 12,
  },
  locationOptionText: {
    flex: 1,
  },
  locationOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationOptionSubtitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 14,
  },
  saveButton: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

