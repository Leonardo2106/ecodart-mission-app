import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionHeader } from '../components/SectionHeader';
import { defaultThresholds, ThresholdSettings, useMission } from '../context/MissionContext';
import { colors } from '../theme/colors';

type FormState = Record<keyof ThresholdSettings, string>;
type ErrorState = Partial<Record<keyof ThresholdSettings, string>>;

const fieldLabels: Record<keyof ThresholdSettings, string> = {
  maxTemperature: 'Temperatura máxima (°C)',
  minBattery: 'Energia mínima (%)',
  minSignal: 'Sinal mínimo (%)',
  maxRadiation: 'Radiação máxima (uSv)',
  maxVibration: 'Vibração máxima'
};

function toFormState(thresholds: ThresholdSettings): FormState {
  return {
    maxTemperature: String(thresholds.maxTemperature),
    minBattery: String(thresholds.minBattery),
    minSignal: String(thresholds.minSignal),
    maxRadiation: String(thresholds.maxRadiation),
    maxVibration: String(thresholds.maxVibration)
  };
}

function validate(form: FormState) {
  const parsed = {
    maxTemperature: Number(form.maxTemperature.replace(',', '.')),
    minBattery: Number(form.minBattery.replace(',', '.')),
    minSignal: Number(form.minSignal.replace(',', '.')),
    maxRadiation: Number(form.maxRadiation.replace(',', '.')),
    maxVibration: Number(form.maxVibration.replace(',', '.'))
  };
  const errors: ErrorState = {};

  if (!Number.isFinite(parsed.maxTemperature) || parsed.maxTemperature < 10 || parsed.maxTemperature > 80) {
    errors.maxTemperature = 'Informe um valor entre 10 e 80.';
  }

  if (!Number.isFinite(parsed.minBattery) || parsed.minBattery < 1 || parsed.minBattery > 100) {
    errors.minBattery = 'Informe um percentual entre 1 e 100.';
  }

  if (!Number.isFinite(parsed.minSignal) || parsed.minSignal < 1 || parsed.minSignal > 100) {
    errors.minSignal = 'Informe um percentual entre 1 e 100.';
  }

  if (!Number.isFinite(parsed.maxRadiation) || parsed.maxRadiation < 1 || parsed.maxRadiation > 100) {
    errors.maxRadiation = 'Informe um valor entre 1 e 100.';
  }

  if (!Number.isFinite(parsed.maxVibration) || parsed.maxVibration < 0.01 || parsed.maxVibration > 2) {
    errors.maxVibration = 'Informe um valor entre 0.01 e 2.';
  }

  return { parsed, errors };
}

export default function SettingsScreen() {
  const { thresholds, updateThresholds } = useMission();
  const [form, setForm] = useState<FormState>(() => toFormState(thresholds));
  const [errors, setErrors] = useState<ErrorState>({});
  const [feedback, setFeedback] = useState('Configurações carregadas do dispositivo.');

  useEffect(() => {
    setForm(toFormState(thresholds));
  }, [thresholds]);

  function updateField(field: keyof ThresholdSettings, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback('');
  }

  async function handleSave() {
    const { parsed, errors: nextErrors } = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback('Revise os campos destacados antes de salvar.');
      return;
    }

    await updateThresholds(parsed);
    setFeedback('Limiar de alerta salvo com AsyncStorage.');
  }

  async function handleReset() {
    setErrors({});
    setForm(toFormState(defaultThresholds));
    await updateThresholds(defaultThresholds);
    setFeedback('Configurações restauradas para o padrão da missão.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <SectionHeader eyebrow="Formulário" title="Limiares de Alerta" />

          <View style={styles.formCard}>
            {(Object.keys(fieldLabels) as Array<keyof ThresholdSettings>).map((field) => (
              <View key={field} style={styles.fieldGroup}>
                <Text style={styles.label}>{fieldLabels[field]}</Text>
                <TextInput
                  value={form[field]}
                  onChangeText={(value) => updateField(field, value)}
                  keyboardType="decimal-pad"
                  placeholder="0"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, errors[field] ? styles.inputError : null]}
                />
                {errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null}
              </View>
            ))}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleSave} activeOpacity={0.82}>
                <Text style={styles.primaryButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleReset} activeOpacity={0.82}>
                <Text style={styles.secondaryButtonText}>Restaurar padrão</Text>
              </TouchableOpacity>
            </View>

            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  flex: {
    flex: 1
  },
  container: {
    padding: 18,
    gap: 18
  },
  formCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    gap: 14
  },
  fieldGroup: {
    gap: 7
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700'
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    color: colors.text,
    paddingHorizontal: 12,
    fontSize: 16
  },
  inputError: {
    borderColor: colors.red
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    lineHeight: 16
  },
  actions: {
    gap: 10,
    marginTop: 4
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
    borderRadius: 8
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '800'
  },
  secondaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700'
  },
  feedback: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18
  }
});
