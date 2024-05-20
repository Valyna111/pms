import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { colors } from "../theme/theme";
import { getAllFlowers } from '../../database/database';

const Exlpore = ({ navigation }) => {

    const[flowers, setFlowers] = useState([]);

    React.useEffect(async () =>{
        const allFlowers = await getAllFlowers();
        setFlowers(allFlowers);
      },[])

    const groupedFlowers = flowers.reduce((acc, flower) => {
        if (!acc[flower.discount]) {
            acc[flower.discount] = [];
        }
        flower.discount != 1 ? acc[flower.discount].push(flower) : null;
        return acc;
    }, {});

    const sortedFlowerList = Object.entries(groupedFlowers)
        .sort((a, b) => a[0] - b[0])
        .map(([discount, flowers]) => ({
            discount: discount,
            flowers: flowers
        }));

    function handleItemPress(item) {
        console.log("press");
        navigation.navigate("DetailView", {
            item
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 32, paddingTop:0, paddingBottom: 0, backgroundColor: colors.background }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollsToTop={true}
                data={sortedFlowerList}
                keyExtractor={(item, index) => `discount-${index}`}
                renderItem={({ item }) => (
                    <>
                        {item.discount != 1 &&
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
                                Скидка {item.discount}%
                            </Text>
                        }
                        {item.flowers.map(flower => (
                            <TouchableOpacity
                                key={flower.id}
                                onPress={() => handleItemPress(flower)}
                                style={{
                                    width: "100%",
                                    marginBottom: 8,
                                    flexDirection: "row",
                                    backgroundColor: "white",
                                    padding: 8,
                                    borderRadius: 16,
                                    alignItems: "center"
                                }}
                            >
                                <Image style={{ borderRadius: 8, height: 80, width: 80 }} source={{uri:flower.image}} />
                                <View style={{
                                    paddingHorizontal: 8, flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flex: 1
                                }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                            {flower?.name_of_item}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: "grey", marginBottom: 8 }}>
                                            BYN{flower?.price}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            />
        </SafeAreaView>
    );
}

export default Exlpore;
