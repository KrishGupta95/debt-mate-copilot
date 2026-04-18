import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { formatInr } from '../utils/format';

type StatsCardProps = {
  totalPending: number;
};

export const StatsCard = ({ totalPending }: StatsCardProps) => (
  <LinearGradient
    colors={['#2563EB', '#1D4ED8']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
    <Text style={styles.label}>Total Pending</Text>
    <Text style={styles.value}>{formatInr(totalPending)}</Text>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Track dues. Close faster.</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadow.card,
  },
  label: {
    color: '#BFDBFE',
    fontSize: 14,
  },
  value: {
    color: colors.card,
    fontSize: 34,
    fontWeight: '700',
    marginTop: 8,
  },
  footer: {
    marginTop: spacing.md,
  },
  footerText: {
    color: '#DBEAFE',
    fontSize: 13,
  },
});
