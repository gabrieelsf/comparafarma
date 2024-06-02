import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Footer from '../../../components/footer/footer';
import Icon from 'react-native-vector-icons/FontAwesome';

const Account = ({ navigation }) => {
  const [ buttonPress, setButtonPress ] = useState(false);

  const handleSubmit = () => {
    console.log('submit');
  };

  const formatCpf = (cpf) => {
    for(let num of cpf) {
      const index = cpf.indexOf(num)
      if(index < 9) cpf[index] = 'x'
    }
    return cpf
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={100}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('username', text)}
                value={''}
                placeholder='Usuário'
                maxLength={15}
                placeholderTextColor="#FFF"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('fullName', text)}
                value={''}
                placeholder='Nome completo'
                maxLength={15}
                placeholderTextColor="#FFF"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('cpf', text)}
                value={formatCpf}
                placeholder='xxx.xxx.xxx-xx'
                maxLength={18}
                placeholderTextColor="#FFF"
                keyboardType='numeric'
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('email', text)}
                value={''}
                placeholder='Email'
                maxLength={200}
                placeholderTextColor="#FFF"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => handleChange('password', text)}
                value={''}
                placeholder='Senha'
                maxLength={15}
                placeholderTextColor="#FFF"
                secureTextEntry
              />
              <Pressable
                style={buttonPress ? styles.buttonHover : styles.button}
                onPressIn={() => setButtonPress(true)}
                onPressOut={() => setButtonPress(false)}
                onPress={handleSubmit}
              >
                <Text style={{ color: '#FFF' }}>Registrar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Account;