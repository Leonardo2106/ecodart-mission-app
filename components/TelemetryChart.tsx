import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type TelemetryChartProps = {
  title: string;
  unit: string;
  values: Array<{
    label: string;
    value: number;
  }>;
  maxValue: number;
  tone?: 'cyan' | 'green' | 'amber' | 'red' | 'magenta';
};

export function TelemetryChart({ title, unit, values, maxValue, tone = 'cyan' }: TelemetryChartProps) {
  const accent = colors[tone];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chart}>
        {values.map((item) => {
          const height = Math.max(16, Math.round((item.value / maxValue) * 126));

          return (
            <View key={item.label} style={styles.barGroup}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height, backgroundColor: accent }]} />
              </View>
              <Text style={styles.barValue}>
                {item.value}
                {unit}
              </Text>
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    gap: 16
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800'
  },
  chart: {
    minHeight: 174,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    gap: 6
  },
  barTrack: {
    height: 132,
    width: '100%',
    maxWidth: 34,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  barValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700'
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: 11
  }
});
