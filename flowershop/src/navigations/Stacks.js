import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import DetailView from "../screens/DetailView";
import Notifications from '../screens/Notifications';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="LandingHome" component={Home} />
            <Stack.Screen name="DetailView" component={DetailView} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    )
}

export {HomeStack}