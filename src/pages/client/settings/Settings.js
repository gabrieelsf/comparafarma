import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import Footer from '../../components/footer/footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const Settings = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();
  const [buttonPress, setButtonPress] = useState(false);
  const [fullName, setFullName] = useState('usuário');

  useEffect(() => {
    const fetchFullName = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email;
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setFullName(userData.fullName || 'usuário');
        }
      }
    };

    fetchFullName();
  }, [auth.currentUser]);

  const handleLogout = async () => {
    await auth.signOut();
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.profileIcon}>
            <Icon style={styles.icons} size={80} name="user" color={'#FFF'} />
          </View>
          <Text>{fullName}</Text>
        </View>
        <Pressable
          style={buttonPress == 'data' ? styles.buttonHover : styles.button}
          onPressIn={() => setButtonPress('data')}
          onPressOut={() => setButtonPress(false)}
          onPress={() => true}
        >
          <Text style={{ color: '#FFF' }}>Dados da conta</Text>
        </Pressable>
        <Pressable
          style={buttonPress == 'payment_methods' ? styles.buttonHover : styles.button}
          onPressIn={() => setButtonPress('payment_methods')}
          onPressOut={() => setButtonPress(false)}
          onPress={() => true}
        >
          <Text style={{ color: '#FFF' }}>Métodos de pagamento</Text>
        </Pressable>
        <Pressable
          style={buttonPress == 'address' ? styles.buttonHover : styles.button}
          onPressIn={() => setButtonPress('address')}
          onPressOut={() => setButtonPress(false)}
          onPress={() => true}
        >
          <Text style={{ color: '#FFF' }}>Endereço</Text>
        </Pressable>
        <Pressable
          style={buttonPress == 'disconnect' ? [styles.buttonHover, { backgroundColor: '#b72525' }] : [styles.button, { backgroundColor: '#EC3535' }]}
          onPressIn={() => setButtonPress('disconnect')}
          onPressOut={() => setButtonPress(false)}
          onPress={handleLogout}
        >
          <Text style={{ color: '#FFF' }}>Desconectar</Text>
        </Pressable>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Settings;
