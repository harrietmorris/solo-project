
import { View, Image, Button, StyleSheet, TextInput } from 'react-native'

import { Montserrat_300Light, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
Montserrat_300Light

const LoginStyles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCD6BC',
  },
  image: {
    width: 150, // Adjust the size as needed
    height: 150,
    marginBottom: 30,
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#4D689D',
    backgroundColor: '#4D689D',
 
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff', 
    marginBottom: 20,
    fontSize: 16,
    color: '#4D689D',
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#D26C22',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_300Light',
  },
  signInButton: {
    backgroundColor: '#FCD6BC', // Background color for Sign in button
    fontWeight: 'bold',
    padding: 5,

  },
  createAccountButton: {
    backgroundColor: 'transparent', // No background color for Create Account button
    color: '#b84d12', // Text color for Create Account button
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default LoginStyles