import { View, Image, Button, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import React, {  useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useDataContext } from '../context/MeetsContext';
import LoginStyles from '../styling/screens/login';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {onLogin, onRegister} = useAuth();
    const { setUsername: setUser} = useDataContext();

    interface CustomButtonProps {
        onPress: () => void;
        title: string;
        style?: object;
      }

    const CustomButton:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={LoginStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
    
    const login = async () => {
      
        const result = await onLogin!(username, email, password);
        // console.log(currentUser);
        if (result && result.error) {
            alert(result.msg);
        } else {
            setUser(username)
        }
    };

    const register = async () => {
        const result = await onRegister!(username, email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

 

    
  return (
    <View style={LoginStyles.container}>
        <Image source={{uri: "https://em-content.zobj.net/source/apple/391/woman-surfing-light-skin-tone_1f3c4-1f3fb-200d-2640-fe0f.png"}} style={LoginStyles.image}/>
        <View style={LoginStyles.form}>
            <TextInput style={LoginStyles.input} placeholder='Username' onChangeText={(text: string) => setUsername(text)} value = {username} autoCapitalize='none'/>
            <TextInput style={LoginStyles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value = {email} autoCapitalize='none' />
            <TextInput style={LoginStyles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value = {password} />
            <CustomButton onPress={login} title="Sign in" style={LoginStyles.signInButton} />
            <CustomButton onPress={register} title="Create Account" style={LoginStyles.signInButton} />
            {/* <Button onPress={login} title='Sign in' />
            <Button onPress={register} title='Create Account' /> */}
        </View>
    </View>
  )
}

export default Login