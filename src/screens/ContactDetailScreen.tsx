import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityItem } from '../components/ActivityItem';
import { colors, radius, shadow, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatInr, getPaidAmount } from '../utils/format';

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
  const totalBalance = records.reduce((sum, item) => {
    const remaining = Math.max(item.amount - getPaidAmount(item.payments), 0);
    return sum + remaining;
  }, 0);

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ActivityItem item={item} />}
      ListHeaderComponent={
        <View>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <View style={styles.headerCard}>
            <Text style={styles.name}>{contactName}</Text>
            <Text style={styles.balance}>{formatInr(totalBalance)}</Text>
            <Text style={styles.label}>Total Balance</Text>
          </View>
          <Pressable style={styles.paymentButton} onPress={onAddPayment}>
            <Text style={styles.paymentButtonText}>Add Payment</Text>
          </Pressable>
          <Text style={styles.sectionTitle}>Transaction History</Text>
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
    marginBottom: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontWeight: '700',
  },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  balance: {
    color: colors.danger,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 8,
  },
  label: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  paymentButton: {
    backgroundColor: colors.success,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  paymentButtonText: {
    color: colors.card,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
