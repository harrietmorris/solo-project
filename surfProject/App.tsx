import { Button, LogBox, Text, TouchableOpacity, View } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import MyTabs from './app/navigation/tabs';
import { FindProvider } from './app/context/MeetsContext';
import AppStyles from './app/styling/app';


interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
}

const CustomButton:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
  <TouchableOpacity style={[AppStyles.button, style]} onPress={onPress}>
      <Text style={AppStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

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
    
      <Stack.Navigator >
        {authState?.authenticated ? (
          <Stack.Screen 
            name='Surf app' 
            component={MyTabs} 
            options={{
              headerTitle: '',
              headerStyle: AppStyles.header,
              headerShadowVisible: false,
              headerRight: () => 
              <View>
                <CustomButton onPress={onLogout} title="Sign Out" style={AppStyles.signOutButton} />
              </View>
              
              // <Button onPress={onLogout} title='Sign Out' />,
            }} />

        ) : (

          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    
  );
    
};