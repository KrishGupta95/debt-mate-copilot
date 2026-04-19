import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { radius, shadow, spacing } from '../theme';

type StatItem = {
  id: string;
  label: string;
  value: string;
  highlight?: boolean;
};

type StatsCardProps = {
  stats: StatItem[];
};

export const StatsCard = ({ stats }: StatsCardProps) => (
  <FlatList
    horizontal
    data={stats}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContent}
    renderItem={({ item }) => (
      <LinearGradient
        colors={item.highlight ? ['#2563EB', '#4F46E5'] : ['#3B82F6', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.value}>{item.value}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </LinearGradient>
    )}
  />
);

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  card: {
    width: 220,
    borderRadius: radius.lg,
    padding: spacing.lg,
    minHeight: 122,
    justifyContent: 'space-between',
    ...shadow.card,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  label: {
    color: '#DBEAFE',
    fontSize: 13,
    fontWeight: '600',
  },
});
