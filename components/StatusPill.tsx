import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type StatusPillProps = {
  status: 'Nominal' | 'Atenção' | 'Crítico';
};

const statusColor = {
  Nominal: colors.green,
  Atenção: colors.amber,
  Crítico: colors.red
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <View style={[styles.pill, { borderColor: statusColor[status] }]}>
      <View style={[styles.dot, { backgroundColor: statusColor[status] }]} />
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: colors.surface
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  text: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700'
  }
});
