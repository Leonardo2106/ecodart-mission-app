import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricCard } from '../components/MetricCard';
import { SectionHeader } from '../components/SectionHeader';
import { TelemetryChart } from '../components/TelemetryChart';
import { useMission } from '../context/MissionContext';
import { colors } from '../theme/colors';

export default function SensorsDashboard() {
  const { current, history } = useMission();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader eyebrow="Dashboard 02" title="Sensores Orbitais" />

        <View style={styles.grid}>
          <MetricCard
            label="Radiação"
            value={`${current.radiation} uSv`}
            detail="Exposição estimada do módulo externo"
            icon="nuclear-outline"
            tone={current.radiation >= 30 ? 'red' : 'amber'}
          />
          <MetricCard
            label="Vibração"
            value={current.vibration.toFixed(2)}
            detail="Oscilação estrutural média do casco"
            icon="pulse-outline"
            tone={current.vibration >= 0.4 ? 'red' : 'cyan'}
          />
        </View>

        <TelemetryChart
          title="Leituras de Temperatura"
          unit="°"
          maxValue={40}
          tone={current.temperature >= 30 ? 'red' : 'magenta'}
          values={history.map((item) => ({ label: item.timestamp, value: Math.round(item.temperature) }))}
        />

        <View style={styles.interpretation}>
          <Text style={styles.interpretationTitle}>Interpretação operacional</Text>
          <Text style={styles.interpretationText}>
            A leitura atual combina temperatura, radiação e vibração para apoiar a triagem de risco. Na próxima parte, estes limiares serão
            configuráveis e persistidos no dispositivo.
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
  interpretation: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8
  },
  interpretationTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800'
  },
  interpretationText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});
