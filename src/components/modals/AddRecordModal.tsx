import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';

type AddRecordFormState = {
  name: string;
  amount: string;
  reason: string;
  dateTime: string;
  notes: string;
};

type AddRecordModalProps = {
  visible: boolean;
  form: AddRecordFormState;
  onClose: () => void;
  onChange: (field: keyof AddRecordFormState, value: string) => void;
  onSubmit: () => void;
};

export const AddRecordModal = ({ visible, form, onClose, onChange, onSubmit }: AddRecordModalProps) => (
  <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Record</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(value) => onChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={form.amount}
          onChangeText={(value) => onChange('amount', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={form.reason}
          onChangeText={(value) => onChange('reason', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date & Time (YYYY-MM-DDTHH:mm:ss)"
          value={form.dateTime}
          onChangeText={(value) => onChange('dateTime', value)}
        />
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Notes"
          multiline
          value={form.notes}
          onChangeText={(value) => onChange('notes', value)}
        />

        <View style={styles.actions}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.addButton]} onPress={onSubmit}>
            <Text style={styles.addText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  addText: {
    color: colors.card,
    fontWeight: '700',
  },
});
