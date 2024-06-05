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
export const API_URL = 'http://localhost:3000/';
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


    const register = async (email: string, password: string) => {
        
        try {
            
            // return await axios.post(`${API_URL}/register`, {email, password});
            const res =  await axios({
                method: 'post',
                url: `${API_URL}/register`,
                data: {
                    email: email,
                    password: password,
                },
    
            });
            console.log(res);

            }
        catch (e: any) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data.message)
            }
            // (e as any).response.data.msg
            //console.log(e.response)
            // if (error.response) {
            //     // Request made but the server responded with an error
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            // } else if (error.request) {
            //     // Request made but no response is received from the server.
            //     console.log(error.request);
            // } else {
            //     // Error occured while setting up the request
            //     console.log('Error', error.message);
            // return await {error: true, msg: 'error line 51 AuthContext.tsx'
                //(e as any).response.data.msg 
            }
        };

    


    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, {email, password});

            console.log("🚀 ~ file: AuthContext.tsx:55 ~ login ~ result", result);

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;

        } catch (e: any) {
    
            //console.log(e.response)
            return {error: true, msg: 'could not log in line 76 AuthContext.tsx'
        }
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