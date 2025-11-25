# 📱 NavBar - Sistema de Navegación

## Cómo añadir nuevas opciones al NavBar

### Paso 1: Añadir la ruta en `NAV_ITEMS`

Edita el archivo `NavBar.tsx` y añade tu nueva opción al array `NAV_ITEMS`:

```typescript
export const NAV_ITEMS: NavItem[] = [
  // ... opciones existentes
  {
    name: 'nueva-opcion',        // Nombre único
    route: '/(tabs)/nueva-ruta',  // Ruta de Expo Router
    icon: 'star',                 // Icono de Ionicons
    label: 'Nueva Opción',        // Texto que se muestra
  },
];
```

### Paso 2: Crear la pantalla

Crea un nuevo archivo en `app/(tabs)/nueva-ruta.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NuevaRutaScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Nueva Pantalla</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
```

### Paso 3: Registrar la ruta en el Layout

Añade la ruta en `app/(tabs)/_layout.tsx`:

```typescript
<Tabs.Screen name="nueva-ruta" />
```

## Iconos disponibles

Puedes usar cualquier icono de Ionicons. Algunos ejemplos:
- `home`, `map`, `notifications`, `settings`
- `heart`, `star`, `bookmark`, `person`
- `calendar`, `time`, `location`, `search`

Para ver todos los iconos disponibles: https://ionic.io/ionicons

## Estructura actual

- **Inicio** (`/(tabs)`) - Pantalla principal con clima
- **Mapa** (`/(tabs)/map`) - Mapa interactivo
- **Alertas** (`/(tabs)/alerts`) - Alertas de inundación
- **Ajustes** (`/(tabs)/settings`) - Configuración de la app

## Personalización

El NavBar se adapta automáticamente a:
- ✅ Colores del tema (modo oscuro/claro)
- ✅ Estado activo de la ruta
- ✅ Animaciones suaves
- ✅ Iconos con estados (outline cuando no está activo)

