import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../ui/AppButton';
import { AppInput } from '../ui/AppInput';
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
  contactOptions: string[];
  onClose: () => void;
  onChange: (field: keyof AddRecordFormState, value: string) => void;
  onSubmit: () => void;
};

export const AddRecordModal = ({
  visible,
  form,
  contactOptions,
  onClose,
  onChange,
  onSubmit,
}: AddRecordModalProps) => {
  const filteredContacts = contactOptions
    .filter((item) => item.toLowerCase().includes(form.name.toLowerCase()))
    .slice(0, 4);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Record</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              label="Contact"
              placeholder="Search or type contact"
              value={form.name}
              onChangeText={(value) => onChange('name', value)}
            />

            {form.name.trim().length > 0 && filteredContacts.length > 0 ? (
              <View style={styles.suggestions}>
                {filteredContacts.map((item) => (
                  <Pressable key={item} style={styles.suggestionItem} onPress={() => onChange('name', item)}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            <AppInput
              label="Amount"
              placeholder="0"
              keyboardType="numeric"
              value={form.amount}
              onChangeText={(value) => onChange('amount', value)}
              containerStyle={styles.amountInput}
            />
            <AppInput
              label="Reason"
              placeholder="Dinner split"
              value={form.reason}
              onChangeText={(value) => onChange('reason', value)}
            />
            <AppInput
              label="Date & Time"
              placeholder="YYYY-MM-DDTHH:mm:ss"
              value={form.dateTime}
              onChangeText={(value) => onChange('dateTime', value)}
            />
            <AppInput
              label="Notes (optional)"
              placeholder="Add notes"
              multiline
              value={form.notes}
              onChangeText={(value) => onChange('notes', value)}
              containerStyle={styles.notesInput}
            />
          </ScrollView>

          <View style={styles.actions}>
            <AppButton label="Cancel" variant="secondary" onPress={onClose} style={styles.actionButton} />
            <AppButton label="Save Record" onPress={onSubmit} style={styles.actionButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    paddingBottom: spacing.lg,
    maxHeight: '86%',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  amountInput: {
    fontSize: 24,
    fontWeight: '700',
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  suggestions: {
    marginTop: -8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});
