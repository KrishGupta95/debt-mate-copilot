import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { formatInr } from '../../utils/format';

type PaymentModalProps = {
  visible: boolean;
  originalAmount: number;
  paidAmount: number;
  remaining: number;
  amount: string;
  onAmountChange: (value: string) => void;
  onQuickPick: (value: number) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const PaymentModal = ({
  visible,
  originalAmount,
  paidAmount,
  remaining,
  amount,
  onAmountChange,
  onQuickPick,
  onClose,
  onSubmit,
}: PaymentModalProps) => (
  <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Payment</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Original</Text>
            <Text style={styles.summaryValue}>{formatInr(originalAmount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Paid</Text>
            <Text style={styles.summaryValue}>{formatInr(paidAmount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={[styles.summaryValue, styles.remaining]}>{formatInr(remaining)}</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter payment amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={onAmountChange}
        />

        <View style={styles.quickActions}>
          {[100, 500].map((quick) => (
            <Pressable key={quick} style={styles.quickButton} onPress={() => onQuickPick(quick)}>
              <Text style={styles.quickText}>₹{quick}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.quickButton} onPress={() => onQuickPick(remaining)}>
            <Text style={styles.quickText}>Full</Text>
          </Pressable>
        </View>

        <View style={styles.actions}>
          <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, styles.payButton]} onPress={onSubmit}>
            <Text style={styles.payText}>Save Payment</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  summaryCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: colors.textSecondary,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  remaining: {
    color: colors.danger,
  },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: 10,
  },
  quickText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: 14,
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  payButton: {
    backgroundColor: colors.success,
  },
  cancelText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  payText: {
    color: colors.card,
    fontWeight: '700',
  },
});
