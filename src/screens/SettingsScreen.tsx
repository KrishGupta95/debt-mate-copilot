import { FlatList, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { TopAppBar } from '../components/TopAppBar';
import { AppCard } from '../components/ui/AppCard';
import { colors, spacing } from '../theme';

type SettingsScreenProps = {
  darkMode: boolean;
  notifications: boolean;
  currency: string;
  onDarkModeChange: (value: boolean) => void;
  onNotificationsChange: (value: boolean) => void;
  onCurrencyChange: (currency: string) => void;
  onResetData: () => void;
};

const currencyOptions = ['₹ INR', '$ USD', '€ EUR'];

export const SettingsScreen = ({
  darkMode,
  notifications,
  currency,
  onDarkModeChange,
  onNotificationsChange,
  onCurrencyChange,
  onResetData,
}: SettingsScreenProps) => (
  <FlatList
    data={currencyOptions}
    keyExtractor={(item) => item}
    renderItem={({ item }) => {
      const active = item === currency;
      return (
        <Pressable style={[styles.currencyPill, active && styles.currencyPillActive]} onPress={() => onCurrencyChange(item)}>
          <Text style={[styles.currencyText, active && styles.currencyTextActive]}>{item}</Text>
        </Pressable>
      );
    }}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Settings" greeting="Customize your app experience" />

        <AppCard style={styles.rowCard}>
          <Text style={styles.rowTitle}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={onDarkModeChange} trackColor={{ true: '#93C5FD', false: '#CBD5E1' }} />
        </AppCard>

        <AppCard style={styles.rowCard}>
          <Text style={styles.rowTitle}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={onNotificationsChange}
            trackColor={{ true: '#93C5FD', false: '#CBD5E1' }}
          />
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Currency</Text>
          <Text style={styles.meta}>Default: ₹ INR</Text>
        </AppCard>
      </View>
    }
    ListFooterComponent={
      <View>
        <AppCard style={styles.versionCard}>
          <Text style={styles.sectionTitle}>App Version</Text>
          <Text style={styles.meta}>v1.0.0</Text>
        </AppCard>

        <Pressable style={styles.resetButton} onPress={onResetData}>
          <Text style={styles.resetText}>Reset Data</Text>
        </Pressable>
      </View>
    }
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    paddingBottom: 140,
    backgroundColor: colors.background,
  },
  rowCard: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 13,
  },
  currencyPill: {
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  currencyPillActive: {
    backgroundColor: '#DBEAFE',
  },
  currencyText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  currencyTextActive: {
    color: colors.primary,
  },
  versionCard: {
    marginTop: spacing.md,
  },
  resetButton: {
    marginTop: spacing.md,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    color: '#DC2626',
    fontWeight: '700',
  },
});
