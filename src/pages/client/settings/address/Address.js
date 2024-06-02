import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable } from 'react-native';
import Footer from '../../../components/footer/footer';
import Icon from 'react-native-vector-icons/FontAwesome';

const Address = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        address
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Address;