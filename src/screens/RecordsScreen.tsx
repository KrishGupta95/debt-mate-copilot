import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RecordCard } from '../components/RecordCard';
import { TopAppBar } from '../components/TopAppBar';
import { colors, radius, spacing } from '../theme';
import { DebtRecord, RecordStatus } from '../types';

type RecordsScreenProps = {
  records: DebtRecord[];
  filter: 'All' | RecordStatus;
  search: string;
  onFilterChange: (filter: 'All' | RecordStatus) => void;
  onSearchChange: (value: string) => void;
  onOpenDetails: (record: DebtRecord) => void;
};

const filters: ('All' | RecordStatus)[] = ['All', 'Pending', 'Paid'];

export const RecordsScreen = ({
  records,
  filter,
  search,
  onFilterChange,
  onSearchChange,
  onOpenDetails,
}: RecordsScreenProps) => (
  <FlatList
    data={records}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <RecordCard item={item} onMenuPress={() => onOpenDetails(item)} />}
    ListHeaderComponent={
      <View>
        <TopAppBar title="Records" greeting="Track every transaction" />
        <TextInput
          placeholder="Search by name or reason"
          value={search}
          onChangeText={onSearchChange}
          style={styles.search}
          placeholderTextColor={colors.textSecondary}
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
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterTab: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: radius.pill,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#DBEAFE',
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
