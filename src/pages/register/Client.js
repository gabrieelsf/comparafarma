import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles'

const Authentication = ({ navigation }) => {
  const [ username,        setUsername ]        = useState('')
  const [ fullName,        setFullName ]        = useState('')
  const [ email,           setEmail ]           = useState('')
  const [ confirmEmail,    setConfirmEmail ]    = useState('')
  const [ password,        setPassword ]        = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ street,          setStreet ]          = useState('')
  const [ number,          setNumber ]          = useState('')
  const [ neighbor,        setNeighbor ]        = useState('')
  const [ complement,      setComplement ]      = useState('')
  const [ invalidForm,     setInvalidForm ]     = useState(true)
  const [ buttonPress,     setButtonPress ]     = useState(false)

  const handleSubmit = () => {
    console.log('press', { login, password });
  }

  const userEntity = {
    username,
    fullName,
    email,
    confirmEmail,
    password,
    confirmPassword,
    street,
    number,
    neighbor,
    complement
  }

  const validate = (field) => {
    if(!userEntity[field].length) return
    if(typeof username != 'string') return
    if(email !== confirmEmail) {
      console.log('email doesnt match');
      return
    }
    if(password !== confirmEmail) {
      console.log('password doesnt match');
      return
    }
    setInvalidForm(false)
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={require('../../assets/loginBackground.png')}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setUsername(text)
              validate('username')
            }}
            value={username}
            maxLength={15}
            placeholder='Usuário'
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setFullName(text)
              validate('fullName')
            }}
            value={fullName}
            maxLength={15}
            placeholder='Nome completo'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setEmail(text)
              validate('email')
            }}
            value={email}
            maxLength={15}
            placeholder='Email'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setConfirmEmail(text)
              validate('confirmEmail')
            }}
            value={confirmEmail}
            maxLength={15}
            placeholder='Confirmar Email'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setPassword(text)
              validate('password')
            }}
            value={password}
            maxLength={15}
            placeholder='Senha'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setConfirmPassword(text)
              validate('confirmPassword')
            }}
            value={confirmPassword}
            maxLength={15}
            placeholder='Confirmar Senha'
            placeholderTextColor="#FFF"
          />
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.inputShort}
              onChangeText={text => {
                setStreet(text)
                validate('street')
              }}
              value={street}
              maxLength={15}
              placeholder='Rua'
              placeholderTextColor="#FFF"
            />
            <TextInput 
              style={styles.inputShort}
              onChangeText={text => {
                setNumber(text)
                validate('number')
              }}
              value={number}
              maxLength={15}
              placeholder='Número'
              placeholderTextColor="#FFF"
            />
          </View>
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setNeighbor(text)
              validate('neighbor')
            }}
            value={neighbor}
            maxLength={15}
            placeholder='Bairro'
            placeholderTextColor="#FFF"
          />
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              setComplement(text)
              validate('complement')
            }}
            value={complement}
            maxLength={15}
            placeholder='Complemento'
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
            <Text style={{ color: '#FFFF' }}>Registrar</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Authentication