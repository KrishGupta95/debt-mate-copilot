import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatDateTime, formatInr, getPaidAmount } from '../utils/format';

type ActivityItemProps = {
  item: DebtRecord;
};

export const ActivityItem = ({ item }: ActivityItemProps) => {
  const paid = getPaidAmount(item.payments);
  const remaining = Math.max(item.amount - paid, 0);
  const isPaid = remaining === 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.amount}>{formatInr(remaining)}</Text>
      </View>
      <Text style={styles.reason}>{item.reason}</Text>
      <View style={styles.row}>
        <Text style={styles.time}>{formatDateTime(item.dateTime)}</Text>
        <View style={[styles.badge, isPaid ? styles.badgePaid : styles.badgePending]}>
          <Text style={[styles.badgeText, isPaid ? styles.badgeTextPaid : styles.badgeTextPending]}>
            {isPaid ? 'Paid' : 'Pending'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reason: {
    marginTop: 6,
    marginBottom: 10,
    color: colors.textSecondary,
  },
  time: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  badge: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgePaid: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextPending: {
    color: '#B45309',
  },
  badgeTextPaid: {
    color: colors.success,
  },
});
