import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MissionProvider } from '../context/MissionContext';
import { colors } from '../theme/colors';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <MissionProvider>
        <StatusBar style="light" />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.cyan,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border
            }
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Missão',
              tabBarIcon: ({ color, size }) => <Ionicons name="planet-outline" color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="sensors"
            options={{
              title: 'Sensores',
              tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="alerts"
            options={{
              title: 'Alertas',
              tabBarIcon: ({ color, size }) => <Ionicons name="warning-outline" color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Config',
              tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />
            }}
          />
        </Tabs>
      </MissionProvider>
    </SafeAreaProvider>
  );
}
