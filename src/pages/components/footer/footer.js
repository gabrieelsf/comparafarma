import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate("home")}>
          <Icon style={styles.icons} size={30} name="home" />
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate("search")}>
          <Icon style={styles.icons} size={30} name="search" />
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate("orders")}>
          <Icon style={styles.icons} size={30} name="shopping-bag" />
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate("settings")}>
          <Icon style={styles.icons} size={30} name="cog" />
        </Pressable>
      </View>
    </View>
  );
};

export default Footer;