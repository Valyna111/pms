import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { loginUser, createTables } from '../../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      console.log(user)
      // createTables();
      navigation.navigate('Main');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <Button title="Войти" onPress={handleLogin} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>У вас ещё нет аккаунта? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Singin")}>
          <Text style={styles.signupLink}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
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
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    color: '#777',
  },
  signupLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginForm;
