import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

import HomeScreen from "../screens/Home";
import FindScreen from "../screens/Find";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name='Home' 
                component={HomeScreen}  
                options={{
                    tabBarLabel: 'Home',
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => 
                        <Ionicons name="home" color={color} size={size}/>
                    }} 
            />  

            <Tab.Screen 
                name='Find' 
                component={FindScreen} 
                options={{
                    tabBarLabel: 'Find',
                    title: "Find",
                    headerShown: false,
                    tabBarIcon: ({color, size}) => 
                        <Ionicons name="location-outline" color={color} size={size} />
                    }}
            />
        </Tab.Navigator>
    )
}

export default MyTabs