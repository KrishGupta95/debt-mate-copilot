import { Platform } from 'react-native';

export const colors = {
  primary: '#2563EB',
  success: '#22C55E',
  danger: '#EF4444',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
  pending: '#F59E0B',
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const radius = {
  md: 16,
  lg: 20,
  pill: 999,
};

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
};
