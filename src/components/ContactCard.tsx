import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { ContactSummary } from '../types';
import { formatInr } from '../utils/format';

type ContactCardProps = {
  item: ContactSummary;
  onPress: () => void;
};

export const ContactCard = ({ item, onPress }: ContactCardProps) => (
  <Pressable onPress={onPress} style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.amount}>{formatInr(item.outstanding)}</Text>
    <Text style={styles.meta}>{item.transactions} transactions</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: colors.danger,
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
  },
  meta: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});
