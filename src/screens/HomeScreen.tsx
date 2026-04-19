import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityItem } from '../components/ActivityItem';
import { StatsCard } from '../components/StatsCard';
import { TopAppBar } from '../components/TopAppBar';
import { colors, spacing } from '../theme';
import { DebtRecord } from '../types';
import { formatInr } from '../utils/format';

type HomeScreenProps = {
  records: DebtRecord[];
  totalPending: number;
  totalLent: number;
  totalContacts: number;
};

export const HomeScreen = ({ records, totalPending, totalLent, totalContacts }: HomeScreenProps) => (
  <FlatList
    data={records}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ActivityItem item={item} />}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Debt Mate" greeting="Welcome back" />
        <StatsCard
          stats={[
            { id: 'lent', label: 'Total Lent', value: formatInr(totalLent), highlight: true },
            { id: 'pending', label: 'Total Pending', value: formatInr(totalPending) },
            { id: 'contacts', label: 'Total Contacts', value: `${totalContacts}` },
          ]}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
      </View>
    }
    ListEmptyComponent={<Text style={styles.empty}>No activity yet. Add your first record.</Text>}
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing.md,
    paddingBottom: 140,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  sectionHeader: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '700',
  },
  viewAll: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 30,
  },
});
