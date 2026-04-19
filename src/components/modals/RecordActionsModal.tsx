import { Modal, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../ui/AppButton';
import { colors, radius, spacing } from '../../theme';
import { DebtRecord } from '../../types';

type RecordActionsModalProps = {
  visible: boolean;
  record: DebtRecord | null;
  onClose: () => void;
  onAddPayment: () => void;
  onMarkFullyPaid: () => void;
  onDelete: () => void;
};

export const RecordActionsModal = ({
  visible,
  record,
  onClose,
  onAddPayment,
  onMarkFullyPaid,
  onDelete,
}: RecordActionsModalProps) => (
  <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Record Actions</Text>
        <Text style={styles.subtitle}>{record?.name}</Text>

        <AppButton label="Add Payment" onPress={onAddPayment} style={styles.button} />
        <AppButton label="Mark as Fully Paid" variant="success" onPress={onMarkFullyPaid} style={styles.button} />
        <AppButton label="Delete Record" variant="danger" onPress={onDelete} style={styles.button} />
        <AppButton label="Cancel" variant="secondary" onPress={onClose} style={styles.button} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'center',
    padding: spacing.md,
  },
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
});
