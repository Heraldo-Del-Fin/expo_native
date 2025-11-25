import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './NavBar.styles';

// Configuración de navegación - Fácil de extender
export interface NavItem {
  name: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

// Aquí puedes añadir nuevas opciones fácilmente
export const NAV_ITEMS: NavItem[] = [
  {
    name: 'home',
    route: '/(tabs)',
    icon: 'home',
    label: 'Inicio',
  },
  {
    name: 'map',
    route: '/(tabs)/map',
    icon: 'map',
    label: 'Mapa',
  },
  {
    name: 'alerts',
    route: '/(tabs)/alerts',
    icon: 'notifications',
    label: 'Alertas',
  },
  {
    name: 'settings',
    route: '/(tabs)/settings',
    icon: 'settings',
    label: 'Ajustes',
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const isActive = (route: string) => {
    // Normalizar rutas para comparación
    const normalizedPath = pathname.replace(/\/$/, '');
    const normalizedRoute = route.replace(/\/$/, '');
    
    if (normalizedRoute === '/(tabs)') {
      return normalizedPath === '/(tabs)' || normalizedPath === '/(tabs)/';
    }
    return normalizedPath === normalizedRoute || normalizedPath.startsWith(normalizedRoute + '/');
  };

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundCard,
          borderTopColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      {NAV_ITEMS.map((item, index) => {
        const active = isActive(item.route);
        return (
          <TouchableOpacity
            key={item.name}
            onPress={() => handlePress(item.route)}
            style={styles.item}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, active && { backgroundColor: colors.tint + '20' }]}>
              <Ionicons
                name={active ? item.icon : (`${item.icon}-outline` as any)}
                size={24}
                color={active ? colors.tint : colors.icon}
              />
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: active ? colors.tint : colors.textSecondary,
                },
              ]}
            >
              {item.label}
            </Text>
            {active && (
              <View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: colors.tint,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

