import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { GetAllUsers } from '../../database/database';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await GetAllUsers();
        console.log(allUsers)
        setUsers(allUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    getAllUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#FBAAB5', paddingBottom: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Имя: {item.name}</Text>
      <Text style={{ marginBottom: 5 }}>Адрес: {item.address}</Text>
      <Text style={{ marginBottom: 5 }}>Телефон: {item.phone}</Text>
      <Text style={{ marginBottom: 5 }}>Почта: {item.email}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UsersList;
