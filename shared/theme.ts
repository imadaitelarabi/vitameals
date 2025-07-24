/**
 * Shared theme constants for Vitameals
 * Used by both web and mobile applications
 */

export const theme = {
  colors: {
    light: {
      // Base colors
      background: '#ffffff',
      foreground: '#171717',
      
      // Primary blue theme
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      
      // Secondary colors
      secondary: '#f1f5f9',
      secondaryForeground: '#334155',
      
      // Accent colors
      accent: '#f8fafc',
      accentForeground: '#475569',
      
      // Muted colors
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      
      // Border and input
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#3b82f6',
      
      // State colors
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      error: '#ef4444',
      errorForeground: '#ffffff',
    },
    dark: {
      // Base colors
      background: '#0f172a',
      foreground: '#f1f5f9',
      
      // Primary blue theme (adjusted for dark mode)
      primary: '#60a5fa',
      primaryForeground: '#0f172a',
      
      // Secondary colors
      secondary: '#1e293b',
      secondaryForeground: '#f1f5f9',
      
      // Accent colors
      accent: '#1e293b',
      accentForeground: '#f1f5f9',
      
      // Muted colors
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      
      // Border and input
      border: '#334155',
      input: '#334155',
      ring: '#60a5fa',
      
      // State colors
      success: '#22c55e',
      successForeground: '#0f172a',
      warning: '#fbbf24',
      warningForeground: '#0f172a',
      error: '#f87171',
      errorForeground: '#0f172a',
    },
  },
  
  // Font families
  fonts: {
    sans: 'system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, Monaco, monospace',
  },
  
  // Spacing scale
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },
  
  // Border radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
} as const;

export type Theme = typeof theme;
export type ColorScheme = keyof typeof theme.colors;
export type ThemeColors = typeof theme.colors.light | typeof theme.colors.dark;