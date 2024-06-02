import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable } from 'react-native';
import Footer from '../../../components/footer/footer';
import Icon from 'react-native-vector-icons/FontAwesome';

const Payment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        payment
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Payment;