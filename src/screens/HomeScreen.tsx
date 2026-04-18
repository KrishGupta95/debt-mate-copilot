import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityItem } from '../components/ActivityItem';
import { StatsCard } from '../components/StatsCard';
import { TopAppBar } from '../components/TopAppBar';
import { colors, spacing } from '../theme';
import { DebtRecord } from '../types';

type HomeScreenProps = {
  records: DebtRecord[];
  totalPending: number;
};

export const HomeScreen = ({ records, totalPending }: HomeScreenProps) => (
  <FlatList
    data={records}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ActivityItem item={item} />}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Debt Mate" greeting="Welcome back, keep your dues in sync" />
        <StatsCard totalPending={totalPending} />
        <Text style={styles.sectionTitle}>Recent Activity</Text>
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
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
