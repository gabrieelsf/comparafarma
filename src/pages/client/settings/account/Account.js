import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import Footer from '../../../components/footer/footer';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'; // Importe as funções necessárias para operações no Firestore

const Account = ({ navigation }) => {
  const db   = getFirestore();
  const auth = getAuth();
  const [ buttonPress,  setButtonPress  ] = useState(false);
  const [ userRef,      setUserRef      ] = useState(false);
  const [ form,         setForm         ] = useState({
    username: '',
    fullName: '',
    cpf: '',
    email: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: name === 'cpf' ? formatCpf(value) : value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email;
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty) {
          setUserRef(querySnapshot.docs[0].ref)
          const userData = querySnapshot.docs[0].data();
          setForm({
            username: userData.username,
            fullName: userData.fullName,
            cpf:      userData.cpf,
            email:    userData.email
          });
        }
      }
    };

    fetchUser();
  }, [auth.currentUser]);

  const handleSubmit = async () => {
    if(userRef) {
      await updateDoc(userRef, form);
      Alert.alert('Sucesso', 'Os dados do usuário foram atualizados com sucesso!');
      console.log('Dados do usuário atualizados com sucesso!');
    } else {
      Alert.alert('Error', 'Usuário não encontrado');
      console.log('Usuário não encontrado');
    }
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
              <Text aria-label="Label for Username" nativeID="labelUsername">Nome de usuário</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelUsername"
                style={styles.input}
                onChangeText={(text) => handleChange('username', text)}
                value={form.username}
                placeholder='Usuário'
                maxLength={15}
                placeholderTextColor="#FFF"
              />
              <Text aria-label="Label for Username" nativeID="labelFullName">Nome completo</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelFullName"
                style={styles.input}
                onChangeText={(text) => handleChange('fullName', text)}
                value={form.fullName}
                placeholder='Nome completo'
                maxLength={15}
                placeholderTextColor="#FFF"
              />
              <Text aria-label="Label for Username" nativeID="labelFullName">Cpf</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelCpf"
                style={styles.input}
                onChangeText={(text) => handleChange('cpf', text)}
                value={form.cpf}
                placeholder='xxx.xxx.xxx-xx'
                maxLength={18}
                placeholderTextColor="#FFF"
                keyboardType='numeric'
                editable={false}
              />
              <Text aria-label="Label for Username" nativeID="labelEmail">Email</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelEmail"
                style={styles.input}
                onChangeText={(text) => handleChange('email', text)}
                value={form.email}
                placeholder='Email'
                maxLength={200}
                placeholderTextColor="#FFF"
              />
              <Pressable
                style={buttonPress ? styles.buttonHover : styles.button}
                onPressIn={() => setButtonPress(true)}
                onPressOut={() => setButtonPress(false)}
                onPress={handleSubmit}
              >
                <Text style={{ color: '#FFF' }}>Atualizar</Text>
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
