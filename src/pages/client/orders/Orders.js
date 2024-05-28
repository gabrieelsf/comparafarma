import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';

const Orders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text>ORDERS</Text>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Orders;
