import { Dimensions, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, TextInput, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Card, Chip, Searchbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../theme/theme"
import { getAllFlowers } from '../../database/database';

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [sortBy, setSortBy] = React.useState(null);

  React.useEffect(() => {
    filterData();
  }, [selectedCategory, searchQuery, minPrice, maxPrice, sortBy]);

  React.useEffect( () =>{
    const fetchData = async () => {
      const allFlowers = await getAllFlowers();
      console.log(allFlowers)
      setFilteredData(allFlowers);
    }
    fetchData();
  },[])

  const handleItemPress = (item) => {
    navigation.navigate("DetailView", { item });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filterData = async () => {
    const allFlowers = await getAllFlowers();
    let filtered = allFlowers;
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name_of_item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(maxPrice));
    }
    setFilteredData(filtered);
  };

  const handleFilterPress = () => {
    setModalVisible(true);
  };

  const applyFilters = () => {
    setModalVisible(false);
    filterData();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 32, paddingTop:0, paddingBottom: 0, backgroundColor: colors.background }}>
      {/* Toolbar */}
      <Toolbar onNotificationPress={() => navigation.navigate("Notifications")} />
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} onFilterPress={handleFilterPress} />
      {/* Big Sale */}
      <BigSale onPress={() => navigation.navigate("Explore")} />
      {/* Tags */}
      <TagCategories onSelectCategory={setSelectedCategory} />
      {/* List View */}
      <ItemListView data={filteredData} onItemPress={handleItemPress} />
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', width:"150px"}}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <TouchableOpacity> 
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, width:"100%", alignItems:"center", textAlign:"center"}}>Фильтры</Text>
            </TouchableOpacity>
            <TextInput
              style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
              placeholder="Минимальная цена"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
              placeholder="Максимальная цена"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
            <TouchableOpacity style={{ backgroundColor: '#FBAAB5', padding: 10, borderRadius: 5 }} onPress={applyFilters} > 
              <Text style={{ color: 'white', fontWeight: 'bold', width:"100%", alignItems:"center", textAlign:"center"}}>Применить</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

function Toolbar({ onNotificationPress }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32
    }}>
      
     
      <View style={{ alignItems: 'center' , width: "100%" }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Blossom shop
        </Text>
      </View>
    </View>
  )
}

function SearchBar({ onSearch, onFilterPress }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 32
    }}>
      <Searchbar
        selectionColor={colors.primary}
        iconColor={colors.primary}
        inputStyle={{ color: colors.primary, fontWeight: "bold" }}
        style={{ flex: 1, borderRadius: 12 }}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <TouchableOpacity onPress={onFilterPress} style={{ borderRadius: 8, marginLeft: 16, padding: 8, justifyContent: "center", alignItems: "center", backgroundColor: colors.primary }}>
        <Icon name="options-outline" color="white" size={24} />
      </TouchableOpacity>
    </View>
  )
}

function BigSale({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 16,
        marginBottom: 32
      }}>
        <View style={{ display: "flex", flexDirection: "row", padding: 2 }}>
          <Image source={{ uri: 'https://i.pinimg.com/736x/e9/fa/de/e9fade471215aaf694ffd8475113444b.jpg' }} style={{ width: 88, borderRadius: 8 }} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ color: colors.onPrimary, fontWeight: 'bold', fontSize: 18 }}>
              Большие Скидки
            </Text>
            <Text style={{ color: colors.onPrimary }}>
              Порадуй себя и близких!
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

function TagCategories({ onSelectCategory }) {
  const categories = ["Все", "Монобукеты", "Авторские", "В коробке"];
  const [selected, setSelected] = React.useState(0);

  const handleCategorySelect = (index) => {
    setSelected(index);
    onSelectCategory(index === 0 ? null : categories[index]);
  };

  return (
    <View style={{ height: 42, marginBottom: 10 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((item, i) => (
          <Chip
            key={i}
            onPress={() => handleCategorySelect(i)}
            style={{
              marginRight: 16,
              height: 33,
              backgroundColor: selected === i ? colors.primary : "#f0f0f0"
            }}
          >
            <Text style={{ color: selected === i ? colors.onPrimary : "grey", fontWeight: 'bold' }}>
              {item}
            </Text>
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

function ItemListView({ data, onItemPress }) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollsToTop={true}
      numColumns={2}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card
          style={{
            width: 140,
            margin: 4,
            marginBottom: 8,
            height: 355,
            backgroundColor: "white"
          }}
          onPress={() => onItemPress(item)}
        >
          <Image style={{ borderRadius: 5, height: 256, width: 140 }} source={{ uri:item.image}} />
          <View style={{
            padding: 8, flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.name_of_item}
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                BYN{item.price}
              </Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
}

export default Home