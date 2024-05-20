import { Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/theme'
import { Button } from 'react-native-paper'
import { CartContext } from '../contexts/CartContext'
import uuid from 'react-native-uuid';
import { flowers } from '../../database/flower.js'
import { addToWhishList, getAllFlowers, getUserWishlist } from '../../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage'

const DetailView = ({ route, navigation }) => {
  const { item } = route.params
  const { addItem } = React.useContext(CartContext)
  const [isLiked, setIsLiked] = React.useState(false)
  const [size_flower, setSize_flower] = React.useState(1)
  const [selectedSize, setSelectedSize] = React.useState("S")

  // const [item, setItem] = useState(null)

  // useEffect(() => {
  //   const getAllFlowersPage = async () => {
  //     try {
  //         const allFlowers = await getAllFlowers();
  //         const item = allFlowers.find(item => item.id === index);
  //         console.log(item);
  //         setItem(item);
  //       } catch (error) {
  //         console.error('Failed to fetch flowers:', error);
  //       }
  //     };
  //     getAllFlowersPage();
  // },[])

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('userData');
        const parceUser = JSON.parse(user);
        console.log(parceUser)
        setUserData(parceUser);
        const flowersUser = await getUserWishlist(parceUser.id);
        console.log(flowersUser)
        const exists = flowersUser.some(flower => flower.id === item.id);
        if (exists)
          {
            setIsLiked(true);
          }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [item]);

  const handleLike = async () => {
    try {
      if(item && userData){
        addToWhishList(userData.id, item.id, !isLiked);
        setIsLiked(!isLiked)
      }
    } catch (error) {
      console.error('Failed to add flower:', error);
    }
  };
  
  function handleSelectedSizeChange(size) {
    setSelectedSize(size)
    switch (size) {
      case "S":
        setSize_flower(1);
        break;
      case "M":
        setSize_flower(1.5);
        break;
      case "L":
        setSize_flower(2);
        break;
      case "XL":
        setSize_flower(2.5);
        break;
      default:
        setSize_flower(1);
    }
  }

  function handleBuyNow() {
    console.log(item.price * size_flower)
    let order = {
      quantity: 1, 
      id: item.id,
      isLiked, 
      selectedSize, 
      price: item.price * size_flower , 
      title: `${item.name_of_item}`, 
      category: `${item.category}`, 
      image : item.image,
      customer_id: userData.id
    }
    addItem(order)
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, padding: 24, paddingBottom: 0 }} >

      {/* Toolbar */}
      <DetailViewToolbar navigation={navigation}  />
      {/* Product Image */}
      <Image style={{ height: 376, width: 310, borderRadius: 32, marginTop: 3, marginBottom: 10}} source={item.image != null ? { uri: item.image } : require('../../database/images/image.png')} />
      {/* Product Details  */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{
            fontSize: 24,
            fontWeight: "bold",
          }}> {item.name_of_item}</Text>
          <Icon suppressHighlighting onPress={() => handleLike()} color={colors.primary} name={isLiked ? "heart" : "heart-outline"} size={35} />
        </View>
        <Text style={{
          fontSize: 12,
          color: "grey",
        }}>{item.category}</Text>
        <View ><SelectSize selectedSize={selectedSize} handleSelectedSizeChange={handleSelectedSizeChange} /></View>
        <View style={{ marginTop: "auto", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 16, fontSize: 24, color: "grey", fontWeight: "bold" }}>
            BYN{ item.price }
          </Text>
          <Button onPress={() => handleBuyNow()} labelStyle={{ flex: 1, color: "white", fontWeight: "bold" }} style={{ padding: 8, backgroundColor: colors.primary, borderRadius: 8, flex: 1 }}>
            Купить
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

function DetailViewToolbar({ navigation }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Icon suppressHighlighting name="arrow-back" onPress={() => navigation.goBack()} size={24} />
      <Icon suppressHighlighting name="ellipsis-vertical-outline" onPress={() => alert("More Options")} size={24} />
    </View>
  )
}

function SelectSize({ handleSelectedSizeChange, selectedSize }) {

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ marginBottom: 8, fontWeight: "bold", fontSize: 12 }}></Text>
      <View style={{ flexDirection: "row" }}>

        {
          ["S", "M", "L", "XL"].map((size, i) =>
            <TouchableOpacity onPress={() => handleSelectedSizeChange(size)} style={{ marginLeft: 8 }} key={i} >
              <Button
                labelStyle={{
                  fontWeight: "bold",
                  color: selectedSize === size ? "white" : "grey"
                }}
                style={{
                  backgroundColor: selectedSize === size ? colors.primary : 'white',
                }} mode={selectedSize === size ? "contained" : "outlined"}>
                {size}
              </Button>
            </TouchableOpacity>)
        }
      </View>
    </View>

  )
}

export default DetailView