import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatDateTime, formatInr, getPaidAmount } from '../utils/format';

type RecordCardProps = {
  item: DebtRecord;
  onMenuPress: () => void;
};

export const RecordCard = ({ item, onMenuPress }: RecordCardProps) => {
  const paid = getPaidAmount(item.payments);
  const remaining = Math.max(item.amount - paid, 0);
  const isPaid = remaining === 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.reason}>{item.reason}</Text>
        </View>
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <Text style={styles.menuText}>⋯</Text>
        </Pressable>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.amount}>{formatInr(remaining)}</Text>
          <Text style={styles.date}>{formatDateTime(item.dateTime)}</Text>
        </View>
        <View style={[styles.badge, isPaid ? styles.paidBadge : styles.pendingBadge]}>
          <Text style={[styles.badgeText, isPaid ? styles.paidText : styles.pendingText]}>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  reason: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
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
