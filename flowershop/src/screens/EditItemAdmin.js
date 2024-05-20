import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { deleteFlower, updateFlower } from '../../database/database';

const EditItemAdmin = ({ route, navigation }) => {
  const { item } = route.params;

  const [title, setTitle] = useState(item.name_of_item);
  const [price, setPrice] = useState(String(item.price));
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(String(item.availability));
  const [discount, setDiscount] = useState(String(item.discount));
  const [image, setImage] = useState(item.image);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleEditProduct = async () => {
    try {
      await updateFlower(item.id, title, category, parseInt(price), image, parseInt(quantity), '', parseInt(discount));
      console.log('Flower updated successfully:', { title, category, price, image, quantity, discount });
      Alert.alert('Success', 'Product updated successfully', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Failed to update flower:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };
  const handleDeleteProduct = async () => {
    try {
      await deleteFlower(item.id);
      console.log('Flower delete successfully:', item.id);
      Alert.alert('Success', 'Product delete successfully', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Failed to update flower:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </TouchableOpacity>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Discount"
        value={discount}
        onChangeText={setDiscount}
        style={{ marginTop: 10, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
        keyboardType="numeric"
      />
      <Button title="Edit Product" onPress={handleEditProduct} />
      <Button title="Delete Product" onPress={handleDeleteProduct} />
    </View>
  );
};

export default EditItemAdmin;
