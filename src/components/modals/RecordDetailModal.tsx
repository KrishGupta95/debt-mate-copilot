import { Modal, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { AppCard } from '../ui/AppCard';
import { colors, radius, spacing } from '../../theme';
import { DebtRecord } from '../../types';
import { formatDateTime, formatInr } from '../../utils/format';

type RecordDetailModalProps = {
  visible: boolean;
  record: DebtRecord | null;
  onClose: () => void;
};

export const RecordDetailModal = ({ visible, record, onClose }: RecordDetailModalProps) => {
  if (!record) {
    return null;
  }

  const timeline = [
    { id: `created-${record.id}`, amount: null, label: record.reason, date: formatDateTime(record.dateTime), status: 'Created' },
    ...record.payments.map((payment) => ({
      id: payment.id,
      amount: formatInr(payment.amount),
      label: 'Payment received',
      date: formatDateTime(payment.paidAt),
      status: 'Paid',
    })),
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{record.name}</Text>
              <Text style={styles.subtitle}>{record.reason}</Text>
            </View>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Payment History</Text>

          <FlatList
            data={timeline}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.timelineRow}>
                <View style={styles.dot} />
                <AppCard style={styles.timelineItem}>
                  <View style={styles.timelineTop}>
                    <Text style={styles.timelineLabel}>{item.label}</Text>
                    {item.amount ? <Text style={styles.timelineAmount}>{item.amount}</Text> : null}
                  </View>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                  <Text style={styles.timelineStatus}>{item.status}</Text>
                </AppCard>
              </View>
            )}
            contentContainerStyle={styles.timelineContainer}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15,23,42,0.35)',
  },
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '78%',
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  close: {
    color: colors.primary,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: spacing.md,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  timelineContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 18,
  },
  timelineItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  timelineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  timelineAmount: {
    color: colors.success,
    fontWeight: '700',
  },
  timelineDate: {
    color: colors.textSecondary,
    marginTop: 4,
    fontSize: 12,
  },
  timelineStatus: {
    color: colors.primary,
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});
