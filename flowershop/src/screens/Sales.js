

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getAllOrders } from '../../database/database';

const Sales = ({ salesData, products }) => {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState(null);
  useEffect(()=> {
    const getAllOrdersPage = async () => {
      try {
        const allOrders = await getAllOrders();
        setOrders(allOrders);
        if (allOrders.lenght != 0) {
        const chartData_value = {
          labels: allOrders.map(item => moment(item.data).format('HH:mm')),
          datasets: [
            {
              data: allOrders.map(item => item.price),
            },
          ],
        };
        setChartData(chartData_value)
        }
      } catch (error) {
        console.error('Failed to fetch Orders:', error);
      }
    };
    getAllOrdersPage();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.item_name}</Text>
        <Text>Пользователь: {item.customer_name}</Text>
        <Text>Цена: {item.price} BYN</Text>
        <Text>Количество: {Math.round(item.availability - (item.availability * 0.5))}</Text>
      </View>
    );
  };
  const testData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
    datasets: [
      {
        data: [10, 20, 30, 25, 35, 30],
      },
    ],
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Информация о продажах</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.chartContainer}>
      
        {/* <LineChart
          data={{
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
            datasets: [{
              data: [10, 20, 30, 25, 35, 30],
            }]
          }}
          width={100} 
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chartContainer: {
    marginTop: 20,
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Sales;
