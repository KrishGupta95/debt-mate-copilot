import { StyleSheet, Text, View } from 'react-native';
import { AppCard } from './ui/AppCard';
import { colors, radius, spacing } from '../theme';
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
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.grow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.reason}>{item.reason}</Text>
          <Text style={styles.time}>{formatDateTime(item.dateTime)}</Text>
        </View>
        <View style={styles.rightPane}>
          <Text style={styles.amount}>{formatInr(remaining)}</Text>
          <View style={[styles.badge, isPaid ? styles.badgePaid : styles.badgePending]}>
            <Text style={[styles.badgeText, isPaid ? styles.badgeTextPaid : styles.badgeTextPending]}>
              {isPaid ? 'Paid' : 'Pending'}
            </Text>
          </View>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  grow: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reason: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 13,
  },
  time: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 12,
  },
  rightPane: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  badge: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgePaid: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextPending: {
    color: '#B45309',
  },
  badgeTextPaid: {
    color: colors.success,
  },
});
