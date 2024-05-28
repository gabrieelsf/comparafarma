import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Footer from '../components/footer/footer';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>DASHBOARD</Text>
      </View>
      <Footer />
    </View>
  );
};

export default Dashboard;
