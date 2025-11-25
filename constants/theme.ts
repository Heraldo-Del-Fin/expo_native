/**
 * Modern color system with blue gradient palette
 * Fondo oscuro → Contenedores más claros
 */

import { Platform } from 'react-native';

// Paleta Azul Medianoche Elegante (Opción 4 - La más oscura)
// Fondo más oscuro → Contenedores más claros
const blueMidnight = '#0a0e27';      // Fondo (más oscuro - casi negro)
const blueNightDark = '#1a1f3a';     // Contenedor nivel 1
const blueNightMedium = '#2a3450';   // Contenedor nivel 2
const blueNightLight = '#3a4a66';    // Contenedor nivel 3
const blueSky = '#5b9bd5';           // Acentos/Tint
const blueSkyBright = '#7bb3e0';     // Tint alternativo

// Colores de texto
const textPrimary = '#f0f4f8';       // Texto principal (blanco azulado)
const textSecondary = '#a8b8c8';     // Texto secundario (gris azulado)

// Status colors
const successGreen = '#4caf50';
const warningOrange = '#ff9800';
const dangerRed = '#f44336';
const dangerRedDark = '#d32f2f';

// Paleta Azul Cielo Nocturno (Opción 2) - Modo Claro
// Invertida: fondo claro → contenedores más oscuros
const lightBlueSky = '#f1f5f9';        // Fondo claro (blanco azulado)
const lightBlueCard = '#e8f4f8';      // Contenedor nivel 1 (más oscuro que fondo)
const lightBlueMedium = '#cbd5e1';    // Contenedor nivel 2 (gris azulado)
const lightBlueDark = '#94a3b8';      // Contenedor nivel 3 (gris azulado oscuro)
const lightBlueTint = '#5fa8d3';      // Acentos (azul cielo claro)
const lightTextPrimary = '#0d1b2a';   // Texto principal (azul noche oscuro)
const lightTextSecondary = '#415a77'; // Texto secundario (azul noche medio)

export const Colors = {
  light: {
    // Paleta Azul Cielo Nocturno (Opción 2) - Modo Claro
    // Fondo claro → contenedores más oscuros
    text: lightTextPrimary,
    textSecondary: lightTextSecondary,
    background: lightBlueSky,         // Fondo claro (blanco azulado)
    backgroundCard: lightBlueCard,    // Contenedor nivel 1 (más oscuro que fondo)
    tint: lightBlueTint,
    icon: lightTextSecondary,
    tabIconDefault: lightTextSecondary,
    tabIconSelected: lightBlueTint,
    // Weather specific
    weatherGradient: [lightBlueCard, lightBlueMedium, lightBlueDark],
    cardGradient: [lightBlueCard, lightBlueMedium],
    danger: dangerRed,
    warning: warningOrange,
    success: successGreen,
    // Sky colors for weather - niveles de azul claro
    skyBlue: lightBlueMedium,         // Nivel 2
    skyBlueLight: lightBlueMedium,    // Nivel 2 para cards internos
    // Niveles adicionales de azul para jerarquía visual
    blueLevel1: lightBlueCard,        // Contenedor principal
    blueLevel2: lightBlueMedium,       // Contenedor secundario
    blueLevel3: lightBlueDark,         // Contenedor terciario
    // Border and shadow
    border: 'rgba(13, 27, 42, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    // Paleta azul: fondo oscuro → contenedores más claros
    text: textPrimary,
    textSecondary: textSecondary,
    background: blueMidnight,        // Fondo más oscuro
    backgroundCard: blueNightDark,   // Contenedor nivel 1 (más claro que fondo)
    tint: blueSky,
    icon: textSecondary,
    tabIconDefault: textSecondary,
    tabIconSelected: blueSky,
    // Weather specific
    weatherGradient: [blueNightDark, blueNightMedium, blueNightLight],
    cardGradient: [blueNightDark, blueNightMedium],
    danger: dangerRedDark,
    warning: warningOrange,
    success: successGreen,
    // Sky colors for weather - niveles de azul
    skyBlue: blueNightMedium,        // Nivel 2
    skyBlueLight: blueNightMedium,   // Nivel 2 para cards internos
    // Niveles adicionales de azul para jerarquía visual
    blueLevel1: blueNightDark,       // Contenedor principal (mismo que backgroundCard)
    blueLevel2: blueNightMedium,      // Contenedor secundario (cards internos, métricas)
    blueLevel3: blueNightLight,      // Contenedor terciario (elementos más pequeños)
    // Border and shadow
    border: 'rgba(95, 168, 211, 0.25)',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
