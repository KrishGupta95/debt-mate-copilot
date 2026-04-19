import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { colors, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatDateTime, formatInr, getPaidAmount } from '../utils/format';

type ContactDetailScreenProps = {
  contactName: string;
  records: DebtRecord[];
  onBack: () => void;
  onAddPayment: () => void;
};

export const ContactDetailScreen = ({
  contactName,
  records,
  onBack,
  onAddPayment,
}: ContactDetailScreenProps) => {
  const totals = records.reduce(
    (acc, item) => {
      const paid = getPaidAmount(item.payments);
      acc.totalLent += item.amount;
      acc.totalPaid += paid;
      acc.totalOutstanding += Math.max(item.amount - paid, 0);
      return acc;
    },
    { totalOutstanding: 0, totalLent: 0, totalPaid: 0 },
  );

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const paid = getPaidAmount(item.payments);
        const remaining = Math.max(item.amount - paid, 0);
        const isPaid = remaining === 0;

        return (
          <View style={styles.timelineRow}>
            <View style={styles.dot} />
            <AppCard style={styles.timelineCard}>
              <View style={styles.timelineTop}>
                <Text style={styles.timelineAmount}>{formatInr(remaining)}</Text>
                <Text style={[styles.timelineStatus, isPaid ? styles.paid : styles.pending]}>
                  {isPaid ? 'Paid' : 'Pending'}
                </Text>
              </View>
              <Text style={styles.timelineReason}>{item.reason}</Text>
              <Text style={styles.timelineDate}>{formatDateTime(item.dateTime)}</Text>
            </AppCard>
          </View>
        );
      }}
      ListHeaderComponent={
        <View>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.name}>{contactName}</Text>

          <View style={styles.statsRow}>
            <AppCard style={styles.statCard}>
              <Text style={styles.statLabel}>Total Outstanding</Text>
              <Text style={styles.statValue}>{formatInr(totals.totalOutstanding)}</Text>
            </AppCard>
            <AppCard style={styles.statCard}>
              <Text style={styles.statLabel}>Total Lent</Text>
              <Text style={styles.statValue}>{formatInr(totals.totalLent)}</Text>
            </AppCard>
          </View>
          <AppCard style={styles.singleStatCard}>
            <Text style={styles.statLabel}>Total Paid</Text>
            <Text style={[styles.statValue, styles.paid]}>{formatInr(totals.totalPaid)}</Text>
          </AppCard>

          <AppButton label="Add Payment" onPress={onAddPayment} style={styles.paymentButton} />
          <Text style={styles.sectionTitle}>Transaction Timeline</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    paddingBottom: 140,
    backgroundColor: colors.background,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backText: {
    color: colors.primary,
    fontWeight: '700',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
  },
  singleStatCard: {
    marginTop: spacing.sm,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },
  paid: {
    color: colors.success,
  },
  pending: {
    color: colors.pending,
  },
  paymentButton: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 18,
  },
  timelineCard: {
    flex: 1,
  },
  timelineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineAmount: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  timelineStatus: {
    fontWeight: '700',
    fontSize: 12,
  },
  timelineReason: {
    color: colors.textPrimary,
    marginTop: 6,
    fontWeight: '600',
  },
  timelineDate: {
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
});
