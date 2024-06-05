import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (email: string, password: string) => Promise <any>;
    onLogin?: (email: string, password: string) => Promise <any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://192.168.0.193:3000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect (() => { 
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        }
        loadToken();
    }, [])

    const register = (email: string, password: string) => {
        axios.post(`${API_URL}/register`, {
            email: email,
            password: password,
          })
            .then(function (response) {
            console.log(response);
          })
             .catch(function (error) {
            console.log(error);
          });
    

    } 
    
    


    


    const login = async (email: string, password: string) => {
        try {
            // console.log("🚀");
            const result = await axios.post(`${API_URL}/login`, {email, password});

            // console.log("🚀 ~ file: AuthContext.tsx:55 ~ login ~ result", result);

            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            // console.log("🚀 2");
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;

        } catch (e: any) {
    
            console.log(e)
            // return {error: true, msg: 'welcome to the global surf community'
        
        }
    }
    

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}