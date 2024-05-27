import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, ImageBackground } from 'react-native';
import styles from './styles';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../database/config.json'

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(firebaseApp)


const Register = ({ navigation }) => {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    street: '',
    houseNumber: '',
    neighbor: '',
    complement: ''
  });

  const [invalidForm, setInvalidForm] = useState(true);
  const [buttonPress, setButtonPress] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: name === 'cpf' ? formatCpf(value) : value });
  };

  useEffect(() => {
    const {
      username, fullName, cpf, email, confirmEmail, password,
      confirmPassword, street, houseNumber, neighbor
    } = form;

    const isValid = username && fullName && cpf && email && confirmEmail && password
      && confirmPassword && street && houseNumber && neighbor
      && email === confirmEmail && password === confirmPassword
      && validateCPF(cpf);

    setInvalidForm(!isValid);
  }, [form]);

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcDigit = (base) => {
      const sum = base.split('').reduce((acc, val, idx) => acc + parseInt(val) * (base.length + 1 - idx), 0);
      const digit = (sum * 10) % 11;
      return digit === 10 ? 0 : digit;
    };

    return calcDigit(cpf.slice(0, 9)) == cpf.charAt(9) && calcDigit(cpf.slice(0, 10)) == cpf.charAt(10);
  };

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      return digits.replace(/(\d{3})(\d{1,3})(\d{1,3})(\d{0,2})/, (_, p1, p2, p3, p4) => (
        `${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '-' + p4 : ''}`
      ));
    }
    return digits.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1,4})(\d{0,2})/, (_, p1, p2, p3, p4, p5) => (
      `${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '/' + p4 : ''}${p5 ? '-' + p5 : ''}`
    ));
  };

  const createUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username:    form.username,
        fullName:    form.fullName,
        cpf:         form.cpf,
        neighbor:    form.neighbor,
        email:       form.email,
        houseNumber: parseInt(form.houseNumber),
        street:      form.street,
        complement:  form.complement
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      const user = userCredential.user;
      createUser();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/loginBackground.png')}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('username', text)}
            value={form.username}
            placeholder='Usuário'
            maxLength={15}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('fullName', text)}
            value={form.fullName}
            placeholder='Nome completo'
            maxLength={15}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('cpf', text)}
            value={form.cpf}
            placeholder='xxx.xxx.xxx-xx'
            maxLength={18}
            placeholderTextColor="#FFF"
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('email', text)}
            value={form.email}
            placeholder='Email'
            maxLength={200}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('confirmEmail', text)}
            value={form.confirmEmail}
            placeholder='Confirmar Email'
            maxLength={200}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('password', text)}
            value={form.password}
            placeholder='Senha'
            maxLength={15}
            placeholderTextColor="#FFF"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            value={form.confirmPassword}
            placeholder='Confirmar Senha'
            maxLength={15}
            placeholderTextColor="#FFF"
            secureTextEntry
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputShort}
              onChangeText={(text) => handleChange('street', text)}
              value={form.street}
              placeholder='Rua'
              maxLength={15}
              placeholderTextColor="#FFF"
            />
            <TextInput
              style={styles.inputShort}
              onChangeText={(text) => handleChange('houseNumber', text)}
              value={form.houseNumber}
              placeholder='Número'
              maxLength={15}
              placeholderTextColor="#FFF"
            />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('neighbor', text)}
            value={form.neighbor}
            placeholder='Bairro'
            maxLength={15}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange('complement', text)}
            value={form.complement}
            placeholder='Complemento'
            maxLength={15}
            placeholderTextColor="#FFF"
          />
          <Pressable
            style={buttonPress ? styles.buttonHover : styles.button}
            disabled={invalidForm}
            onPressIn={() => setButtonPress(true)}
            onPressOut={() => setButtonPress(false)}
            onPress={handleSubmit}
          >
            <Text style={{ color: '#FFF' }}>Registrar</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;
