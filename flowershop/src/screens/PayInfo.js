import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const PayInfo = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    try {
      const payInfo = {
        cardNumberUser : cardNumber, 
        cardHolderUser : cardHolder,
        expiryDateUser: expiryDate,
        cvvUser: cvv
      };
      await AsyncStorage.setItem('payInfo', JSON.stringify(payInfo));
      console.log(payInfo)
      Alert.alert('Успех', 'Данные сохранены', [{ text: 'OK' }]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(()=>{
    const fetchData = async () =>{
      const payInfo = await AsyncStorage.getItem('payInfo');
      const parseData = JSON.parse(payInfo);
      setCardNumber(parseData.cardNumberUser);
      setCardHolder(parseData.cardHolderUser);
      setExpiryDate(parseData.expiryDateUser);
      setCvv(parseData.cvvUser);
    }
    fetchData();
  },[])

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Введите реквизиты для оплаты</Text>
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        placeholder="Номер карты"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        placeholder="Имя владельца карты"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        placeholder="Срок действия (MM/YYYY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <Button title="Сохранить" onPress={handlePayment} />
    </View>
  );
};

export default PayInfo;
