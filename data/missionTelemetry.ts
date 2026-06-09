export type TelemetrySnapshot = {
  id: string;
  timestamp: string;
  temperature: number;
  battery: number;
  signal: number;
  latency: number;
  packetLoss: number;
  throughput: number;
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
    latency: 122,
    packetLoss: 0.4,
    throughput: 48,
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
    latency: 138,
    packetLoss: 0.7,
    throughput: 45,
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
    latency: 164,
    packetLoss: 1.2,
    throughput: 41,
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
    latency: 212,
    packetLoss: 2.4,
    throughput: 35,
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
    latency: 286,
    packetLoss: 4.8,
    throughput: 27,
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
    latency: 236,
    packetLoss: 3.1,
    throughput: 32,
    orbitalStability: 93,
    radiation: 24,
    vibration: 0.36
  }
];
