import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = '@weather_location';

export interface SavedLocation {
  type: 'coords' | 'city';
  coords?: { lat: number; lon: number };
  city?: string;
  name: string; // Display name
}

// Request location permissions
export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

// Get current GPS location
export async function getCurrentLocation(): Promise<{ lat: number; lon: number } | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('Location permission denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

// Get location name from coordinates (reverse geocoding)
export async function getLocationName(lat: number, lon: number): Promise<string> {
  try {
    const [result] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
    if (result) {
      return result.city || result.district || result.region || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    }
    return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  } catch (error) {
    console.error('Error getting location name:', error);
    return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  }
}

// Save location preference
export async function saveLocation(location: SavedLocation): Promise<void> {
  try {
    await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Error saving location:', error);
  }
}

// Get saved location preference
export async function getSavedLocation(): Promise<SavedLocation | null> {
  try {
    const saved = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error getting saved location:', error);
    return null;
  }
}

// Clear saved location
export async function clearSavedLocation(): Promise<void> {
  try {
    await AsyncStorage.removeItem(LOCATION_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing saved location:', error);
  }
}
