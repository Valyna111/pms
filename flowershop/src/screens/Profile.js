import { Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        console.log("User from storage", user);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text> {userData === null ? "No user data found" : userData } </Text>
    </SafeAreaView>
  );
}

export default Profile;
