import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800'
  }
});
