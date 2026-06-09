export type TelemetrySnapshot = {
  id: string;
  timestamp: string;
  temperature: number;
  battery: number;
  signal: number;
  orbitalStability: number;
  radiation: number;
  vibration: number;
};

export const missionTelemetry: TelemetrySnapshot[] = [
  {
    id: 'T-001',
    timestamp: '14:00',
    temperature: 21.4,
    battery: 86,
    signal: 94,
    orbitalStability: 98,
    radiation: 12,
    vibration: 0.18
  },
  {
    id: 'T-002',
    timestamp: '14:05',
    temperature: 22.1,
    battery: 84,
    signal: 92,
    orbitalStability: 97,
    radiation: 14,
    vibration: 0.21
  },
  {
    id: 'T-003',
    timestamp: '14:10',
    temperature: 24.8,
    battery: 80,
    signal: 88,
    orbitalStability: 95,
    radiation: 18,
    vibration: 0.27
  },
  {
    id: 'T-004',
    timestamp: '14:15',
    temperature: 27.9,
    battery: 74,
    signal: 82,
    orbitalStability: 92,
    radiation: 22,
    vibration: 0.34
  },
  {
    id: 'T-005',
    timestamp: '14:20',
    temperature: 31.6,
    battery: 68,
    signal: 76,
    orbitalStability: 90,
    radiation: 31,
    vibration: 0.43
  },
  {
    id: 'T-006',
    timestamp: '14:25',
    temperature: 29.2,
    battery: 71,
    signal: 80,
    orbitalStability: 93,
    radiation: 24,
    vibration: 0.36
  }
];
