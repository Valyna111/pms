    
    
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './Stacks';
import Explore  from '../screens/Exlpore';
import Cart  from '../screens/Cart';
import Profile  from '../screens/Profile';
import AdminStacks from './AdminStacks'
import MenegerStacks from './MenegerStacks'
import UserStacks from './UserStacks'
import getTabIcon from '../utils/getTabIcon';
import { CartContext } from '../contexts/CartContext';
import { colors } from '../theme/theme';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {addedItems} = React.useContext(CartContext)

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        setUserData(JSON.parse(user));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon(props, route),
        headerShown: false,
        tabBarShowLabel: false,
        swipeEnabled:true,
        tabBarBadgeStyle:{
          backgroundColor:colors.primaryContainer,
          color:"white"
        }
    })}>
      <Tab.Screen name="Home"  component={HomeStack} />
      <Tab.Screen name="Explore"  component={Explore} />
      <Tab.Screen name="Cart" options={addedItems.length > 0 && {  tabBarBadge: addedItems?.length }} component={Cart} />
      <Tab.Screen 
        name="Profile" 
        component={userData && userData.role === 'admin' ? AdminStacks : userData && userData.role === 'maneger' ? MenegerStacks : UserStacks } 
      />
    </Tab.Navigator>
  )
}

export default Tabs