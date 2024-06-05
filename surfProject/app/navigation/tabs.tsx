import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeScreen from "../screens/Home";
import findScreen from "../screens/Find";
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='home' component={homeScreen}  options={{
                tabBarLabel: 'Home',
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, size}) => <Ionicons name="home" color={color} size={size}/>
             }} />  

            <Tab.Screen name='find' component={findScreen} options={{
                tabBarLabel: 'Find',
                title: "Find",
                headerShown: false,
                tabBarIcon: ({color, size}) => <Ionicons name="location-outline" color={color} size={size} />
        }}
        />
        </Tab.Navigator>
    )
}

export default MyTabs