import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


// Defining my typescript types for each property/method used in authentication 
interface AuthProps {
    authState?: { username: string | null, token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, email: string, password: string) => Promise <any>;
    onLogin?: (username: string, email: string, password: string) => Promise <any>;
    onLogout?: () => Promise<any>;
}

// Accesing tokens/url (NOTE: this is an odd url, because for some reason to work with ios it needs to be my local ip address)
const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://192.168.0.193:3000';
// export const API_URL = 'http://localhost:3000'
const AuthContext = createContext<AuthProps>({});

//Creating function with built in features of react
export const useAuth = () => {
    return useContext(AuthContext);
};

//authorisation function, requires a token that is authenticated which will then allow users to access app.
export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        username: string | null,
        token: string | null;
        authenticated: boolean | null;
    }>({
        username: null,
        token: null,
        authenticated: null
    });


    // Need to access stored token if it exists, and change authState to true so that user can access app.
    useEffect (() => { 
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const username = await SecureStore.getItemAsync('username');
            console.log("stored:", token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    username: username,
                    token: token,
                    authenticated: true
                });
            }
    
        }
        loadToken();
    }, [])

    //when registering want to send details to the server.
    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username: username,
                email: email,
                password: password,
              });
                    console.log(response);
                    return response.data;
        } catch (error) {
            console.log(error);
            throw error;

        }
    }
        
           
        
    


    

    //When doing login, need to check if email and password are in the database.
    const login = async (username: string, email: string, password: string) => {
        try {
            // console.log("🚀");
            const result = await axios.post(`${API_URL}/login`, {username, email, password});

            // console.log("🚀 ~ file: AuthContext.tsx:55 ~ login ~ result", result);

            setAuthState({
                username: username,
                token: result.data.token,
                authenticated: true
            });
            // console.log("🚀 2");
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync( TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync( 'username',  username);

            return result;

        } catch (e: any) {
    
            console.log(e)
            // return {error: true, msg: 'welcome to the global surf community'
        
        }
    }
    
    //Upon logout, want to delete the token key!
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync('username');

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            username: null,
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