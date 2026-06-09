import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { missionTelemetry, TelemetrySnapshot } from '../data/missionTelemetry';

type MissionContextValue = {
  missionName: string;
  current: TelemetrySnapshot;
  history: TelemetrySnapshot[];
  status: 'Nominal' | 'Atenção' | 'Crítico';
};

const MissionContext = createContext<MissionContextValue | null>(null);

function resolveStatus(snapshot: TelemetrySnapshot): MissionContextValue['status'] {
  if (snapshot.temperature >= 31 || snapshot.battery <= 68 || snapshot.signal <= 76) {
    return 'Crítico';
  }

  if (snapshot.temperature >= 28 || snapshot.battery <= 74 || snapshot.signal <= 82) {
    return 'Atenção';
  }

  return 'Nominal';
}

export function MissionProvider({ children }: PropsWithChildren) {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((currentCursor) => (currentCursor + 1) % missionTelemetry.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const value = useMemo(() => {
    const current = missionTelemetry[cursor];
    const history = missionTelemetry.slice(0, cursor + 1);

    return {
      missionName: 'Aurora-7 Orbital Lab',
      current,
      history,
      status: resolveStatus(current)
    };
  }, [cursor]);

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission() {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider');
  }

  return context;
}
