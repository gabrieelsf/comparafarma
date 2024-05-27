import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ navigation }) => {
  return (
    <View >
      <View style={styles.footer}>
        <Icon style={styles.icons} size={15} name="home" /> 
        <Icon style={styles.icons} size={15} name="search" /> 
        <Icon style={styles.icons} size={15} name="shopping-bag" /> 
        <Icon style={styles.icons} size={15} name="cog" /> 
      </View>
    </View>
  );
};

export default Footer;
