import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { missionTelemetry, TelemetrySnapshot } from '../data/missionTelemetry';
import { loadThresholds, saveThresholds } from '../storage/settingsStorage';

export type ThresholdSettings = {
  maxTemperature: number;
  minBattery: number;
  minSignal: number;
  maxRadiation: number;
  maxVibration: number;
};

export type MissionAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'Atenção' | 'Crítico';
  metric: keyof ThresholdSettings;
};

type MissionContextValue = {
  missionName: string;
  current: TelemetrySnapshot;
  history: TelemetrySnapshot[];
  status: 'Nominal' | 'Atenção' | 'Crítico';
  thresholds: ThresholdSettings;
  alerts: MissionAlert[];
  updateThresholds: (nextThresholds: ThresholdSettings) => Promise<void>;
};

const MissionContext = createContext<MissionContextValue | null>(null);

export const defaultThresholds: ThresholdSettings = {
  maxTemperature: 30,
  minBattery: 70,
  minSignal: 80,
  maxRadiation: 28,
  maxVibration: 0.4
};

function buildAlerts(snapshot: TelemetrySnapshot, thresholds: ThresholdSettings): MissionAlert[] {
  const nextAlerts: MissionAlert[] = [];

  if (snapshot.temperature >= thresholds.maxTemperature) {
    nextAlerts.push({
      id: 'temperature',
      title: 'Temperatura acima do limite',
      description: `${snapshot.temperature.toFixed(1)}°C medidos; limite configurado em ${thresholds.maxTemperature}°C.`,
      severity: snapshot.temperature >= thresholds.maxTemperature + 3 ? 'Crítico' : 'Atenção',
      metric: 'maxTemperature'
    });
  }

  if (snapshot.battery <= thresholds.minBattery) {
    nextAlerts.push({
      id: 'battery',
      title: 'Reserva de energia baixa',
      description: `${snapshot.battery}% de bateria restante; mínimo operacional em ${thresholds.minBattery}%.`,
      severity: snapshot.battery <= thresholds.minBattery - 6 ? 'Crítico' : 'Atenção',
      metric: 'minBattery'
    });
  }

  if (snapshot.signal <= thresholds.minSignal) {
    nextAlerts.push({
      id: 'signal',
      title: 'Sinal de telemetria degradado',
      description: `${snapshot.signal}% de qualidade no link; mínimo configurado em ${thresholds.minSignal}%.`,
      severity: snapshot.signal <= thresholds.minSignal - 6 ? 'Crítico' : 'Atenção',
      metric: 'minSignal'
    });
  }

  if (snapshot.radiation >= thresholds.maxRadiation) {
    nextAlerts.push({
      id: 'radiation',
      title: 'Radiação elevada',
      description: `${snapshot.radiation} uSv detectados; limite configurado em ${thresholds.maxRadiation} uSv.`,
      severity: snapshot.radiation >= thresholds.maxRadiation + 6 ? 'Crítico' : 'Atenção',
      metric: 'maxRadiation'
    });
  }

  if (snapshot.vibration >= thresholds.maxVibration) {
    nextAlerts.push({
      id: 'vibration',
      title: 'Vibração estrutural elevada',
      description: `${snapshot.vibration.toFixed(2)} registrado; limite configurado em ${thresholds.maxVibration.toFixed(2)}.`,
      severity: snapshot.vibration >= thresholds.maxVibration + 0.12 ? 'Crítico' : 'Atenção',
      metric: 'maxVibration'
    });
  }

  return nextAlerts;
}

function resolveStatus(alerts: MissionAlert[]): MissionContextValue['status'] {
  if (alerts.some((alert) => alert.severity === 'Crítico')) {
    return 'Crítico';
  }

  if (alerts.length > 0) {
    return 'Atenção';
  }

  return 'Nominal';
}

export function MissionProvider({ children }: PropsWithChildren) {
  const [cursor, setCursor] = useState(0);
  const [thresholds, setThresholds] = useState<ThresholdSettings>(defaultThresholds);

  useEffect(() => {
    loadThresholds()
      .then((storedThresholds) => {
        if (storedThresholds) {
          setThresholds({ ...defaultThresholds, ...storedThresholds });
        }
      })
      .catch(() => {
        setThresholds(defaultThresholds);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((currentCursor) => (currentCursor + 1) % missionTelemetry.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  async function updateThresholds(nextThresholds: ThresholdSettings) {
    setThresholds(nextThresholds);
    await saveThresholds(nextThresholds);
  }

  const value = useMemo(() => {
    const current = missionTelemetry[cursor];
    const history = missionTelemetry.slice(0, cursor + 1);
    const alerts = buildAlerts(current, thresholds);

    return {
      missionName: 'Aurora-7 Orbital Lab',
      current,
      history,
      status: resolveStatus(alerts),
      thresholds,
      alerts,
      updateThresholds
    };
  }, [cursor, thresholds]);

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider');
  }

  return context;
}
