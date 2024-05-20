
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getAllFlowers } from '../../database/database';

const ProductList = ({ }) => {
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

export default ProductList;
