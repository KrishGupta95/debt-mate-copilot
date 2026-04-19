import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, shadow } from '../../theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export const AppButton = ({ label, onPress, variant = 'primary', style }: AppButtonProps) => {
  const isGradient = variant === 'primary';
  const isSuccess = variant === 'success';
  const isDanger = variant === 'danger';

  return (
    <Pressable
      style={[styles.base, isSuccess && styles.successButton, isDanger && styles.dangerButton, style]}
      onPress={onPress}
    >
      {isGradient ? (
        <LinearGradient colors={['#2563EB', '#4F46E5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fill}>
          <Text style={styles.primaryText}>{label}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.secondaryText, isSuccess && styles.lightText, isDanger && styles.lightText]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#E2E8F0',
  },
  successButton: {
    backgroundColor: colors.success,
  },
  dangerButton: {
    backgroundColor: '#DC2626',
  },
  fill: {
    width: '100%',
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  primaryText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
  lightText: {
    color: colors.card,
  },
});
