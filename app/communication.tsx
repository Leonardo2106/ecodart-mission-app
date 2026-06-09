import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricCard } from '../components/MetricCard';
import { SectionHeader } from '../components/SectionHeader';
import { TelemetryChart } from '../components/TelemetryChart';
import { useMission } from '../context/MissionContext';
import { colors } from '../theme/colors';

export default function CommunicationDashboard() {
  const { current, history, thresholds } = useMission();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader eyebrow="Dashboard 03" title="Comunicação" />

        <View style={styles.grid}>
          <MetricCard
            label="Sinal"
            value={`${current.signal}%`}
            detail={`Mínimo operacional: ${thresholds.minSignal}%`}
            icon="radio-outline"
            tone={current.signal <= thresholds.minSignal ? 'red' : 'cyan'}
          />
          <MetricCard
            label="Latência"
            value={`${current.latency} ms`}
            detail="Tempo médio de ida e volta da telemetria"
            icon="time-outline"
            tone={current.latency >= 240 ? 'amber' : 'green'}
          />
          <MetricCard
            label="Perda"
            value={`${current.packetLoss.toFixed(1)}%`}
            detail="Pacotes descartados no enlace orbital"
            icon="git-compare-outline"
            tone={current.packetLoss >= 4 ? 'red' : 'magenta'}
          />
          <MetricCard
            label="Throughput"
            value={`${current.throughput} Mb/s`}
            detail="Capacidade útil do canal de transmissão"
            icon="cloud-upload-outline"
            tone={current.throughput <= 30 ? 'amber' : 'green'}
          />
        </View>

        <TelemetryChart
          title="Qualidade do Sinal"
          unit="%"
          maxValue={100}
          tone="cyan"
          values={history.map((item) => ({ label: item.timestamp, value: item.signal }))}
        />

        <TelemetryChart
          title="Latência do Link"
          unit="ms"
          maxValue={320}
          tone={current.latency >= 240 ? 'amber' : 'green'}
          values={history.map((item) => ({ label: item.timestamp, value: item.latency }))}
        />

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Apoio preditivo</Text>
          <Text style={styles.noteText}>
            Queda de sinal combinada com aumento de latência indica risco de degradação no enlace. O app usa esses sinais para antecipar alertas
            operacionais e orientar a tomada de decisão.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    padding: 18,
    gap: 18
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  note: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    gap: 8
  },
  noteTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  noteText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});
