import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../ui/AppButton';
import { AppCard } from '../ui/AppCard';
import { AppInput } from '../ui/AppInput';
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

        <AppCard style={styles.summaryCard}>
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
        </AppCard>

        <AppInput
          label="Payment Amount"
          placeholder="Enter payment amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={onAmountChange}
          containerStyle={styles.amountInput}
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
          <AppButton label="Cancel" variant="secondary" onPress={onClose} style={styles.actionButton} />
          <AppButton label="Save Payment" onPress={onSubmit} style={styles.actionButton} />
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
    backgroundColor: colors.primaryTint,
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
  amountInput: {
    fontSize: 22,
    fontWeight: '700',
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
  },
});
