import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';
import { TabKey } from '../types';

type BottomNavBarProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'records', label: 'Records' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'settings', label: 'Settings' },
];

export const BottomNavBar = ({ activeTab, onTabChange }: BottomNavBarProps) => (
  <View style={styles.container}>
    {tabs.map((tab) => {
      const isActive = tab.key === activeTab;
      return (
        <Pressable key={tab.key} style={[styles.tab, isActive && styles.activeTab]} onPress={() => onTabChange(tab.key)}>
          <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: spacing.xs,
    borderRadius: radius.lg,
    ...shadow.card,
  },
  tab: {
    flex: 1,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#DBEAFE',
  },
  label: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  activeLabel: {
    color: colors.primary,
  },
});
