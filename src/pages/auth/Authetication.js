import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles'

const Authentication = ({ navigation }) => {
  const [ login,       setLogin ]       = useState('')
  const [ password,    setPassword ]    = useState('')
  const [ invalidForm, setInvalidForm ] = useState(true)
  const [ buttonPress, setButtonPress ] = useState(false)

  const handleSubmit = () => {
    console.log('press', { login, password });
  }

  const validate = () => {
    if(!login.length || !password.length) return
    if(typeof login != 'string') return
    setInvalidForm(false)
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../../assets/loginBackground.png')}>
        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setLogin(text)
              validate()
            }}
            value={login}
            maxLength={15}
            placeholder='Login'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setPassword(text)
              validate()
            }}
            value={password}
            maxLength={15}
            placeholder='Senha'
            placeholderTextColor="#FFF"
          />

          <Pressable
            style={buttonPress ? styles.buttonHover : styles.button }
            disabled={invalidForm}
            onPress={() => {
              setButtonPress(false)
              handleSubmit()
            }}
            onPressIn={() => setButtonPress(true)}
          >
            <Text style={{ color: '#FFFF' }}>Entrar</Text>
          </Pressable>
          <Text style={{ color: '#FFFF' }} onPress={() => navigation.navigate('register')}>Não possui cadastro</ Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Authentication