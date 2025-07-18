import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRole, type UserRole } from '../context/RoleContext';

const LoginScreen = ({ navigation }: any) => {
  const { setUserRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles: { role: UserRole; description: string; color: string }[] = [
    {
      role: 'Admin',
      description: 'Full access - View, create and delete audits',
      color: '#dc2626',
    },
    {
      role: 'Auditor',
      description: 'Create and submit audit reports',
      color: '#2563eb',
    },
    {
      role: 'Viewer',
      description: 'View-only access to audit reports',
      color: '#16a34a',
    },
  ];

  const handleLogin = () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role to continue');
      return;
    }

    setUserRole(selectedRole);
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Internal Audit System</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <View style={styles.roleContainer}>
          {roles.map(({ role, description, color }) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleCard,
                selectedRole === role && {
                  borderColor: color,
                  backgroundColor: `${color}10`,
                },
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <View
                style={[styles.roleIndicator, { backgroundColor: color }]}
              />
              <View style={styles.roleInfo}>
                <Text style={styles.roleName}>{role}</Text>
                <Text style={styles.roleDescription}>{description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            !selectedRole && styles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={!selectedRole}
        >
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 40,
  },
  roleContainer: {
    marginBottom: 40,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roleIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
