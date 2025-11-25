import { useTheme } from '@/contexts/ThemeContext';

// Hook que usa el contexto de tema para obtener el color scheme
export function useColorScheme(): 'dark' | 'light' {
  try {
    const { theme } = useTheme();
    return theme;
  } catch {
    // Si no hay ThemeProvider, retornar 'dark' por defecto
    return 'dark';
  }
}
