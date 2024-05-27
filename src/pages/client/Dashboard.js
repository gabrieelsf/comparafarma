import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles';
import Footer from '../components/footer/footer'

const Dashboard = ({ navigation }) => {
  return (
    <View >
        <Text>DASHBOARD</Text>
        <Footer />
    </View>
  );
};

export default Dashboard;
