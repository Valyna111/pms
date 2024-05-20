import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { getAllFlowers } from '../../database/database';

const AdminFlowerList = ({navigation}) => {
  const [flowers, setFlowers] = useState(null);

  useEffect(()=> {
    const getAllFlowersPage = async () => {
      try {
          const allFlowers = await getAllFlowers();
          console.log(allFlowers)
          setFlowers(allFlowers);
        } catch (error) {
          console.error('Failed to fetch flowers:', error);
        }
      };
      getAllFlowersPage();
  },[])

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditItemAdmin', { item })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
        <Text>{item.name_of_item}</Text>
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

export default AdminFlowerList;
