import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';

type AppInputProps = {
  label: string;
  containerStyle?: TextInputProps['style'];
} & TextInputProps;

export const AppInput = ({ label, containerStyle, ...props }: AppInputProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={colors.muted}
      style={[styles.input, containerStyle]}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
});
