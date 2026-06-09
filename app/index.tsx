import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricCard } from '../components/MetricCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatusPill } from '../components/StatusPill';
import { TelemetryChart } from '../components/TelemetryChart';
import { useMission } from '../context/MissionContext';
import { colors } from '../theme/colors';

export default function MissionDashboard() {
  const { current, history, missionName, status } = useMission();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <SectionHeader eyebrow="EcoDart Mission" title={missionName} />
          <StatusPill status={status} />
        </View>

        <View style={styles.summaryBand}>
          <Text style={styles.summaryTitle}>Telemetria simulada em tempo real</Text>
          <Text style={styles.summaryText}>
            Última leitura {current.id} recebida às {current.timestamp}. O estado global atualiza os indicadores e mantém as telas sincronizadas.
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard
            label="Energia"
            value={`${current.battery}%`}
            detail="Reserva operacional dos módulos críticos"
            icon="battery-half-outline"
            tone={current.battery <= 70 ? 'amber' : 'green'}
          />
          <MetricCard
            label="Sinal"
            value={`${current.signal}%`}
            detail="Qualidade do link de telemetria"
            icon="radio-outline"
            tone={current.signal <= 80 ? 'amber' : 'cyan'}
          />
          <MetricCard
            label="Temperatura"
            value={`${current.temperature.toFixed(1)}°C`}
            detail="Controle térmico do laboratório orbital"
            icon="thermometer-outline"
            tone={current.temperature >= 30 ? 'red' : 'magenta'}
          />
          <MetricCard
            label="Estabilidade"
            value={`${current.orbitalStability}%`}
            detail="Variação de atitude e órbita prevista"
            icon="navigate-circle-outline"
            tone="cyan"
          />
        </View>

        <TelemetryChart
          title="Tendência de Energia"
          unit="%"
          maxValue={100}
          tone="green"
          values={history.map((item) => ({ label: item.timestamp, value: item.battery }))}
        />
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
  header: {
    gap: 14
  },
  summaryBand: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  }
});
