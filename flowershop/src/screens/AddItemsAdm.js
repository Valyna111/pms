import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createFlower } from '../../database/database';

const AddItemsAdmin = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);

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

  const handleAddProduct = async () => {
    try {
      createFlower(title, category, parseInt(price), image, parseInt(quantity), '', parseInt(discount));
      console.log('Flower added successfully:', { title, category, price, image, quantity, discount });
       // Reset form fields and image state after adding product
      setTitle('');
      setPrice('');
      setCategory('');
      setQuantity('');
      setDiscount('');
      setImage(null);
    } catch (error) {
      console.error('Failed to add flower:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={image != null ? { uri: image } : require('../../database/images/image.png')} style={{ width: 200, height: 200 }} />
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
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

export default AddItemsAdmin;
