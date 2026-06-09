import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThresholdSettings } from '../context/MissionContext';

const THRESHOLDS_KEY = '@space_predictive:thresholds';

export async function loadThresholds() {
  const stored = await AsyncStorage.getItem(THRESHOLDS_KEY);

  if (!stored) {
    return null;
  }

  return JSON.parse(stored) as ThresholdSettings;
}

export async function saveThresholds(thresholds: ThresholdSettings) {
  await AsyncStorage.setItem(THRESHOLDS_KEY, JSON.stringify(thresholds));
}
