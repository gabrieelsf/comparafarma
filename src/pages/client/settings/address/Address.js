import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import Footer from '../../../components/footer/footer';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'; // Importe as funções necessárias para operações no Firestore

const Address = ({ navigation }) => {
  const db   = getFirestore();
  const auth = getAuth();
  const [ buttonPress,  setButtonPress  ] = useState(false);
  const [ userRef,      setUserRef      ] = useState(false);
  const [ form,         setForm         ] = useState({
    houseNumber: '',
    neighbor: '',
    street: '',
    complement: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
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
            houseNumber: userData.houseNumber,
            neighbor:    userData.neighbor,
            street:      userData.street,
            complement:  userData.complement
          });
        }
      }
    };

    fetchUser();
  }, [auth.currentUser]);

  const handleSubmit = async () => {
    if(userRef) {
      await updateDoc(userRef, { ...form, houseNumber: parseInt(form.houseNumber) });
      Alert.alert('Sucesso', 'Os dados do usuário foram atualizados com sucesso!');
      console.log('Dados do usuário atualizados com sucesso!');
    } else {
      Alert.alert('Error', 'Usuário não encontrado');
      console.log('Usuário não encontrado');
    }
  };

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
              <Text aria-label="Label for Neighbor" nativeID="labelNeighbor">Bairro</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelNeighbor"
                style={styles.input}
                onChangeText={(text) => handleChange('neighbor', text)}
                value={form.neighbor}
                placeholder='Bairro'
                maxLength={15}
                placeholderTextColor="#FFF"
              />
              <Text aria-label="Label for Street" nativeID="labelStreet">Rua</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelStreet"
                style={styles.input}
                onChangeText={(text) => handleChange('street', text)}
                value={form.street}
                placeholder='Rua'
                maxLength={18}
                placeholderTextColor="#FFF"
              />
              <Text aria-label="Label for HouseNumber" nativeID="labelHouseNumber">Número</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelHouseNumber"
                style={styles.input}
                onChangeText={(text) => handleChange('houseNumber', text)}
                value={`${form.houseNumber}`}
                placeholder='Número da sua casa'
                maxLength={15}
                keyboardType='numeric'
                placeholderTextColor="#FFF"
              />
              <Text aria-label="Label for Complement" nativeID="labelComplement">Complemento</Text>
              <TextInput
                aria-label="input" 
                aria-labelledby="labelComplement"
                style={styles.input}
                onChangeText={(text) => handleChange('complement', text)}
                value={form.complement}
                placeholder='Casa A'
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

export default Address;
