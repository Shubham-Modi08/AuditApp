import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRole } from '../context/RoleContext';
import AuditHistoryScreen from '../screens/AuditHistoryScreen';
import PolicyViewerScreen from '../screens/PolicyViewerScreen';

const Tab = createBottomTabNavigator();

const LogoutButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
);

const MainTabNavigator = ({ navigation }: any) => {
  const { logout } = useRole();

  const handleLogout = useCallback(() => {
    logout();
    navigation.replace('Login');
  }, [logout, navigation]);

  const renderHeaderRight = useCallback(() => {
    return <LogoutButton onPress={handleLogout} />;
  }, [handleLogout]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarIconStyle: { display: 'none' },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          marginTop: 10,
          fontSize: 14,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerRight: renderHeaderRight,
      }}
    >
      <Tab.Screen
        name="AuditHistory"
        component={AuditHistoryScreen}
        options={{
          title: 'Audit History',
          tabBarLabel: 'Audits',
        }}
      />
      <Tab.Screen
        name="PolicyViewer"
        component={PolicyViewerScreen}
        options={{
          title: 'Policy Manual',
          tabBarLabel: 'Policies',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MainTabNavigator;
