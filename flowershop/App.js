import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartContextProvider } from './src/contexts/CartContext';
import Hello from './src/screens/Hello';
import { useEffect } from 'react';
import { View } from 'react-native';
import LoginStack from './src/navigations/LoginStack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigations/Main';
import {createOrdersTable, createSalesTable, createFlowersTable} from "./database/database.js";

const App = () => {
  const [welcomScreen, setWelcomScreen] = React.useState(false);
  useEffect(() => {
    async function createTables() {
        try {
            // createOrdersTable(),
            // createSalesTable(),
            // createFlowersTable()
            setTimeout(() => { setWelcomScreen(true)}, 3000)
        } catch (error) {
            console.error('Failed to create tables:', error);
        }
    }

    createTables();
}, []);
  return (
    <>
    {!welcomScreen ?
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Hello/>
      </View>
    :
      <SafeAreaProvider>
        <CartContextProvider>
          <NavigationContainer> 
            <LoginStack/>
           </NavigationContainer>
          <StatusBar style="auto" backgroundColor='pink' />
        </CartContextProvider>
      </SafeAreaProvider>
    }
    </>
  )
}

export default App