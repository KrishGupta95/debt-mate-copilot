import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppCard } from './ui/AppCard';
import { colors, radius, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatDateTime, formatInr, getPaidAmount } from '../utils/format';

type RecordCardProps = {
  item: DebtRecord;
  onMenuPress: () => void;
  onPress: () => void;
};

export const RecordCard = ({ item, onMenuPress, onPress }: RecordCardProps) => {
  const paid = getPaidAmount(item.payments);
  const remaining = Math.max(item.amount - paid, 0);
  const isPaid = remaining === 0;

  return (
    <Pressable onPress={onPress}>
      <AppCard style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.leftInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.reason}>{item.reason}</Text>
            <Text style={styles.date}>{formatDateTime(item.dateTime)}</Text>
          </View>
          <Pressable onPress={onMenuPress} style={styles.menuButton}>
            <Text style={styles.menuText}>⋯</Text>
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.amount}>{formatInr(remaining)}</Text>
          <View style={[styles.badge, isPaid ? styles.paidBadge : styles.pendingBadge]}>
            <Text style={[styles.badgeText, isPaid ? styles.paidText : styles.pendingText]}>
              {isPaid ? 'Paid' : 'Pending'}
            </Text>
          </View>
        </View>
      </AppCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  leftInfo: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  reason: {
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 13,
  },
  date: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 12,
  },
  menuButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 20,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '700',
  },
  badge: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  paidBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  pendingText: {
    color: '#B45309',
  },
  paidText: {
    color: colors.success,
  },
});
