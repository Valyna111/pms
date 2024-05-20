import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0, // Поднять содержимое выше
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%', // Устанавливаем ширину кнопки
  },
  buttonText: {
    fontSize: 16, // Устанавливаем размер текста кнопки
  },
  userText: {
    fontSize: 24,
    marginBottom: 40, // Устанавливаем отступ снизу для текста
  },
});

const ManagerProfilePage = ({ navigation }) => {
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
    <View style={styles.container}>
      <Text style={styles.userText}>Привет, {userData ? userData.name : null}!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Получить товары" onPress={() => navigation.navigate('ProductList')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Продажи" onPress={() => navigation.navigate('Sales')} />
      </View>
    </View>
  );
};

export default ManagerProfilePage;
