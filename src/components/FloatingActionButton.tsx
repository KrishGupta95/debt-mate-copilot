import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, shadow } from '../theme';

type FloatingActionButtonProps = {
  onPress: () => void;
};

export const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.icon}>＋</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 92,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
  },
});
