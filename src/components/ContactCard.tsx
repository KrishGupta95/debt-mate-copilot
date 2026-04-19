import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppCard } from './ui/AppCard';
import { colors, spacing } from '../theme';
import { ContactSummary } from '../types';
import { formatDateTime, formatInr } from '../utils/format';

type ContactCardProps = {
  item: ContactSummary;
  onPress: () => void;
};

export const ContactCard = ({ item, onPress }: ContactCardProps) => (
  <Pressable onPress={onPress}>
    <AppCard style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.amount}>{formatInr(item.outstanding)}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{item.transactions} transactions</Text>
        <Text style={styles.meta}>Last: {formatDateTime(item.lastTransactionDate)}</Text>
      </View>
    </AppCard>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  amount: {
    color: colors.primary,
    marginTop: 6,
    fontSize: 22,
    fontWeight: '700',
  },
  metaRow: {
    marginTop: spacing.sm,
    gap: 2,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
