import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../../database/config.json';
import Icon from 'react-native-vector-icons/FontAwesome';

initializeApp(firebaseConfig);
const auth = getAuth();

const Authentication = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);
  const [buttonPress, setButtonPress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, login, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('userToken', user.uid);
        navigation.navigate('home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
    console.log('press', { login, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    if (!login.length || !password.length) return;
    if (typeof login !== 'string') return;
    setInvalidForm(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../../assets/loginBackground.png')}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setLogin(text);
              validate();
            }}
            value={login}
            maxLength={200}
            placeholder='Login'
            placeholderTextColor="#FFF"
          />
          <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              style={{ flex: 1, color: '#FFF' }}
              onChangeText={(text) => {
                setPassword(text);
                validate();
              }}
              value={password}
              maxLength={15}
              placeholder='Senha'
              placeholderTextColor="#FFF"
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={togglePasswordVisibility} style={{ padding: 10 }}>
              {
                showPassword 
                  ? <Icon style={{ color: '#FFF' }} size={15} name="eye-slash" /> 
                  : <Icon style={{ color: '#FFF' }} size={15} name="eye" /> 
              }
            </Pressable>
          </View>
          <Pressable
            style={buttonPress ? styles.buttonHover : styles.button}
            disabled={invalidForm}
            onPress={() => {
              setButtonPress(false);
              handleSubmit();
            }}
            onPressIn={() => setButtonPress(true)}
          >
            <Text style={{ color: '#FFFF' }}>Entrar</Text>
          </Pressable>
          <Text style={{ color: '#FFFF' }} onPress={() => navigation.navigate('register')}>Não possui cadastro</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Authentication;
