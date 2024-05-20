import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100, // Поднять содержимое выше
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
  buttonsWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
  },
});

const AdminProfilePage = ({ navigation }) => {
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

  const onViewUsersPress = () => {
    navigation.navigate('UsersList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Привет, {userData ? userData.name : null}!</Text>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonContainer}>
          <Button title="Добавить товар" onPress={() => navigation.navigate('AddItemsAdmin')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Список товаров" onPress={() => navigation.navigate('AdminFlowerList')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Пользователи" onPress={onViewUsersPress} />
        </View>
      </View>
    </View>
  );
};

export default AdminProfilePage;
