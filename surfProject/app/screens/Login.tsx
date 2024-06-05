import { View, Text, Image, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const {onLogin, onRegister} = useAuth();

    // useEffect(() => {
    //     const testCall = async () => {
    //         const result = await axios.get(`${API_URL}/users`)

    //         console.log("🚀 ~ file: Login.tsx:15 ~ testCall ~ result", result);
    //     }
    //     testCall();

    // }, [])

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };

    const register = async () => {
        const result = await onRegister!(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }
    
  return (
    <View style={styles.container}>
        <Image source={{uri: "https://em-content.zobj.net/source/apple/391/woman-surfing-light-skin-tone_1f3c4-1f3fb-200d-2640-fe0f.png"}} style={styles.image}/>
        <View style={styles.form}>
            {/* <TextInput style={styles.input} placeholder='First Name' onChangeText={(text: string) => setName(text)} value = {name} /> */}
            <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value = {email} autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value = {password} />
            <Button onPress={login} title='Sign in' />
            <Button onPress={register} title='Create Account' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width: '60%',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    container: {
        alignItems: 'center',
        width: '100%',

    }
    
});
export default Login