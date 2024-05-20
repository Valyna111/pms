import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper'; // Предполагается, что вы используете библиотеку react-native-paper
import { getUserWishlist } from '../../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserWishList = ({ data, onItemPress }) => {

  const [userData, setUserData] = useState(null);
  const [flowers, setFlowers] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        const parceUser = JSON.parse(user);
        console.log(parceUser)
        setUserData(parceUser);
        const flowersUser = await getUserWishlist(parceUser.id);
        setFlowers(flowersUser)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
        <View style={{ flexDirection: 'column', justifyContent: "center" }}>
          <Text>Наименование: {item.name_of_item}</Text>
          <Text>Количество: {item.availability}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={flowers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default UserWishList;
