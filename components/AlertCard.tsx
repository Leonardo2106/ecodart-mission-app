import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MissionAlert } from '../context/MissionContext';
import { colors } from '../theme/colors';

type AlertCardProps = {
  alert: MissionAlert;
};

export function AlertCard({ alert }: AlertCardProps) {
  const accent = alert.severity === 'Crítico' ? colors.red : colors.amber;

  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      <View style={styles.header}>
        <Ionicons name={alert.severity === 'Crítico' ? 'warning-outline' : 'alert-circle-outline'} size={22} color={accent} />
        <Text style={styles.severity}>{alert.severity}</Text>
      </View>
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.description}>{alert.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    gap: 8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  severity: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800'
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});
