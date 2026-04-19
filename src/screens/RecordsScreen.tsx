import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RecordCard } from '../components/RecordCard';
import { TopAppBar } from '../components/TopAppBar';
import { AppInput } from '../components/ui/AppInput';
import { colors, radius, spacing } from '../theme';
import { DebtRecord, RecordStatus } from '../types';

type RecordsScreenProps = {
  records: DebtRecord[];
  filter: 'All' | RecordStatus;
  search: string;
  onFilterChange: (filter: 'All' | RecordStatus) => void;
  onSearchChange: (value: string) => void;
  onOpenDetails: (record: DebtRecord) => void;
  onOpenActions: (record: DebtRecord) => void;
};

const filters: ('All' | RecordStatus)[] = ['All', 'Pending', 'Paid'];

export const RecordsScreen = ({
  records,
  filter,
  search,
  onFilterChange,
  onSearchChange,
  onOpenDetails,
  onOpenActions,
}: RecordsScreenProps) => (
  <FlatList
    data={records}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <RecordCard item={item} onPress={() => onOpenDetails(item)} onMenuPress={() => onOpenActions(item)} />
    )}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Records" greeting="Track every transaction" />
        <AppInput
          label="Search"
          placeholder="Search by name or reason"
          value={search}
          onChangeText={onSearchChange}
          containerStyle={styles.search}
        />
        <View style={styles.filters}>
          {filters.map((item) => {
            const active = item === filter;
            return (
              <Pressable
                key={item}
                style={[styles.filterTab, active && styles.filterTabActive]}
                onPress={() => onFilterChange(item)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    }
    ListEmptyComponent={<Text style={styles.empty}>No records found</Text>}
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
  search: {
    borderRadius: radius.pill,
    backgroundColor: colors.primarySurface,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterTab: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primarySoft,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.primary,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
  },
});
