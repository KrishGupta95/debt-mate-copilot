import { Modal, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
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
    { id: `created-${record.id}`, label: `Created • ${formatDateTime(record.dateTime)}` },
    ...record.payments.map((payment) => ({
      id: payment.id,
      label: `Payment ${formatInr(payment.amount)} • ${formatDateTime(payment.paidAt)}`,
    })),
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{record.name}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>{record.reason}</Text>
          <Text style={styles.sectionTitle}>Full History</Text>

          <FlatList
            data={timeline}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.timelineItem}>{item.label}</Text>}
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
    maxHeight: '72%',
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 6,
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
  timelineItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    padding: spacing.sm,
    color: colors.textPrimary,
  },
});
