import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UserProfile = ({ userName, onCartPress, onWishlistPress, onProfilePress, navigation }) => {
  const [userData, setUserData] = useState([]);
  
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
    <View style={styles.container}>
      <Text style={styles.userText}>Профиль пользователя: {userData ? userData.name : null}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Реквизиты" onPress={() => navigation.navigate('PayInfo')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Вишлист" onPress={() => navigation.navigate('UserWishList')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    fontSize: 24,
    marginBottom: 20,
    position: 'absolute',
    top: 100, // Adjust this value to move the text higher
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
  },
});

export default UserProfile;
