import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

type TopAppBarProps = {
  title: string;
  greeting?: string;
  avatarText?: string;
};

export const TopAppBar = ({ title, greeting, avatarText = 'DM' }: TopAppBarProps) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
    </View>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{avatarText}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  greeting: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
