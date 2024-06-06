import { Button } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import MyTabs from './app/navigation/tabs';
import { FindProvider } from './app/context/MeetsContext';



const Stack = createNativeStackNavigator();

export default function App() {



  return (
    <AuthProvider>
      <NavigationContainer>
        <FindProvider> 
          <Layout />
        </FindProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout} = useAuth();



  return (
    
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen 
            name='Surf app' 
            component={MyTabs} 
            options={{
              headerRight: () => <Button onPress={onLogout} title='Sign Out' />,
            }} />

        ) : (

          <Stack.Screen name='Login' component={Login} />
        )}
      </Stack.Navigator>
    
  );
    
};