import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCard } from '../components/AlertCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatusPill } from '../components/StatusPill';
import { useMission } from '../context/MissionContext';
import { colors } from '../theme/colors';

export default function AlertsScreen() {
  const { alerts, current, status } = useMission();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <SectionHeader eyebrow="Sistema de Alertas" title="Eventos Críticos" />
          <StatusPill status={status} />
        </View>

        <View style={styles.summaryBand}>
          <Text style={styles.summaryTitle}>{alerts.length} alerta(s) ativo(s)</Text>
          <Text style={styles.summaryText}>
            A leitura {current.id}, das {current.timestamp}, foi comparada com os limiares configurados e persistidos no dispositivo.
          </Text>
        </View>

        {alerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Operação nominal</Text>
            <Text style={styles.emptyText}>Nenhum parâmetro ultrapassou os limites atuais da missão.</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </View>
        )}
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
  list: {
    gap: 12
  },
  emptyState: {
    minHeight: 180,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 20,
    gap: 8
  },
  emptyTitle: {
    color: colors.green,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center'
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  }
});
