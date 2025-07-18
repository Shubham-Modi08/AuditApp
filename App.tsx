import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoleProvider } from './src/context/RoleContext';
import { AuditProvider } from './src/context/AuditContext';
import LoginScreen from './src/screens/LoginScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import AuditFormScreen from './src/screens/AuditFormScreen';
import AuditSummaryScreen from './src/screens/AuditSummaryScreen';
import PolicyViewerScreen from './src/screens/PolicyViewerScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RoleProvider>
      <AuditProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#2563eb',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuditForm"
              component={AuditFormScreen}
              options={{ title: 'New Audit' }}
            />
            <Stack.Screen
              name="AuditSummary"
              component={AuditSummaryScreen}
              options={{ title: 'Audit Summary' }}
            />
            <Stack.Screen
              name="PolicyViewer"
              component={PolicyViewerScreen}
              options={{ title: 'Policy Manual' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuditProvider>
    </RoleProvider>
  );
};

export default App;
