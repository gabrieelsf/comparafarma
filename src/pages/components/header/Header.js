import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <Icon style={styles.icons} size={23} name="user" color="#FFF" onPress={() => navigation.navigate("home")} />
        </View>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Compara Farma</Text>
        <Icon style={styles.icons} size={23} name="bell" onPress={() => navigation.navigate("notifications")} />
      </View>
    </View>
  );
};

export default Header;