import { Alert, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton } from 'react-native-paper';
import { colors } from "../theme/theme";
import Icon from "react-native-vector-icons/Ionicons"
import { CartContext } from '../contexts/CartContext';
import { flowers } from '../../database/flower.js'
import { createOrder } from '../../database/database.js';


const Cart = ({ navigation }) => {
const { emptyCart } = React.useContext(CartContext)

  return (
    <SafeAreaView style={{ position: "relative", flex: 1, paddingHorizontal: 32, paddingBottom: 0 }}>
      {/* Toolbar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Ваша корзина</Text>
        <Text onPress={() => emptyCart()}>
          Очистить
        </Text>
      </View>
      {/* Cart Item List */}
      <CartItemList navigation={navigation} />
      {/* Checkout */}
      <Checkout />
    </SafeAreaView>
  )
}

function CartItemList({ navigation }) {
  const { addedItems, removeItem, updateItem } = React.useContext(CartContext)

  if (addedItems.length <= 0) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Корзина пустая</Text>
      <Button onPress={() => navigation.navigate("Home")} style={{ padding: 4, backgroundColor: colors.primary }} labelStyle={{
        color: colors.onPrimary
      }}>Отправиться за покупками!!</Button>
    </View>
  }


  return (
    <View style={{ paddingTop: 16 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollsToTop={true}
        data={addedItems}
        keyExtractor={(item) => {
         return item?.id
        }}
        renderItem={( {item,index} ) => {

          return (<View style={{
            width: "100%",
            marginBottom: 8,
            flexDirection: "row",
            backgroundColor: "white",
            padding: 8,
            borderRadius: 16,
            alignItems: "center"
          }}>
            <Image style={{ borderRadius: 8, height: 80, width: 80 }} source={{uri:item.image}} />
            <View style={{
              paddingHorizontal: 8, flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1
            }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.title} ({item?.selectedSize})
                </Text>
                <Text style={{ fontSize: 14, color: "grey", marginBottom: 8 }}>
                  BYN{item?.price}
                </Text>
                {/* CountHandler */}
                <QuantityHandler index={index} item={item} updateItem={updateItem} />
              </View>
              <Icon name="trash-outline" onPress={() => removeItem(item?.id)} color="red" size={24} />
            </View>
          </View>)
        }
        } />
    </View>
  )
}

function QuantityHandler({ item,index, updateItem }) {

  function handleDecrease() {
    if (item.quantity === 1) {

      alert("Minimum 1 is required");

      return;

    }
    let updatedQuantity = --item.quantity;
    updateItem(index, updatedQuantity)
  }
  function handleIncrease() {
    if (item.quantity === 10) {

      alert("Maximum 10 is allowed");

      return;

    }
    let updatedQuantity = ++item.quantity;
    updateItem(index, updatedQuantity)
  }

  return (
    <View style={{
      flexDirection: "row", alignItems: "center"
    }}>

      {/* Subtract */}
      <TouchableOpacity
        onPress={() => handleDecrease()}
        style={{
          backgroundColor: colors.primary,
          padding: 4,
          borderRadius: 4,
          marginRight: 8
        }}>
        <Icon name="remove" size={20} color="white" />
      </TouchableOpacity>
      {/* Value */}
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
      }}>{item.quantity}</Text>
      {/* Add */}
      <TouchableOpacity
        onPress={() => handleIncrease()}
        style={{
          backgroundColor: colors.primary,
          padding: 4,
          borderRadius: 4,
          marginLeft: 8
        }}>
        <Icon name="add" size={20} color="white" />
      </TouchableOpacity>

    </View>
  )
}

function Checkout() {
  const { totalAmount, addedItems, emptyCart } = React.useContext(CartContext)

  const handleCreateOrder = async () => {
    try {
      // console.log(addedItems)
      createOrder(addedItems)
      Alert.alert('Успех', 'Заказ оплачен', [{ text: 'OK' }]);
      emptyCart()
      console.log("Order")
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  return (
    <View style={{
      backgroundColor: "white",
      padding: 16,
      position: "absolute",
      width: Dimensions.get("screen").width,
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between"
    }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
        <Text style={{ fontSize: 14, color: "grey" }}>Итоговая стоимость:</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", }}>BYN{totalAmount}</Text>
      </View>
      {
        totalAmount > 0 && 
        <Button labelStyle={{ color: "white", fontWeight: "bold" }} style={{ padding: 8, backgroundColor: colors.primaryContainer, borderRadius: 8, flex: 1 }}
        onPress={handleCreateOrder}
        >
          Оплатить
        </Button>
      }
    </View>
  )
}

export default Cart