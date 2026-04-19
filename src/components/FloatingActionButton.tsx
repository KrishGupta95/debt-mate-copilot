import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { radius, shadow } from '../theme';

type FloatingActionButtonProps = {
  onPress: () => void;
};

export const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => (
  <Pressable style={styles.button} onPress={onPress}>
    <LinearGradient colors={['#2563EB', '#4F46E5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
      <Text style={styles.icon}>＋</Text>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 104,
    borderRadius: radius.pill,
    ...shadow.card,
  },
  gradient: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 29,
    lineHeight: 31,
  },
});
