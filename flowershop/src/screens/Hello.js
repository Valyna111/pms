import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Hello= ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/hello.jpg')} 
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 700,
    height: 800,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Hello;
