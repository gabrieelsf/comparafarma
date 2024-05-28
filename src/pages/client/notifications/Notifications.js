import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';

const Notifications = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={styles.content}>
        <View style={styles.card}>
            <Text style={{ color: '#FFF', fontSize: 15 }}>Fique atento as nossas promoções, os preços estarão caindo logo logo</Text>
        </View>
        <View style={styles.card}>
            <Text style={{ color: '#FFF', fontSize: 15 }}>Parabéns pela sua nova conta🥳🥳 Esperamos que você aproveite bastante nosso app.</Text>
        </View>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Notifications;
