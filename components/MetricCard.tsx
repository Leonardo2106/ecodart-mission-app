import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: 'cyan' | 'green' | 'amber' | 'red' | 'magenta';
};

export function MetricCard({ label, value, detail, icon, tone = 'cyan' }: MetricCardProps) {
  const accent = colors[tone];

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { borderColor: accent }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 148,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    gap: 8
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800'
  },
  detail: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18
  }
});
