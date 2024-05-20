import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { saveToDatabase , deleteCustomersTable } from '../../database/database';
import * as SQLite from 'expo-sqlite';

const Singin = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const db = SQLite.openDatabase('_flowershop.db', "0.0.1");

  const handleRegistration = async () => {
    try {
        saveToDatabase(name, address, phone, email, password)
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Адрес"
        value={address}
        onChangeText={(value) => setAddress(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        value={phone}
        onChangeText={(value) => setPhone(value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Почта"
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <Button 
        title="Зарегистироваться" 
        onPress={
          handleRegistration
        } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FBAAB5',
    borderRadius: 5,
  }
});

export default Singin;
