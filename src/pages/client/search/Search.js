import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Search = ({ navigation }) => {
  const [buttonPress, setButtonPress] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const productCollection = collection(db, 'products');
      const snapshot = await getDocs(productCollection);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductData(products);

      const getImageUrls = async () => {
        const storage = getStorage();
        const updatedProducts = await Promise.all(products.map(async product => {
          const storageRef = ref(storage, product.imageUrl);
          try {
            const url = await getDownloadURL(storageRef);
            return { ...product, imageUrl: url };
          } catch (error) {
            console.error('Error getting image URL:', error);
            return product;
          }
        }));
        setProductData(updatedProducts);
        setIsLoading(false);
      };

      getImageUrls();
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.content, styles.inputContainer]}>
        <TextInput 
          placeholder='Faça sua pesquisa...' 
          style={styles.input} 
          placeholderTextColor="#FFF"
        />
        <View style={styles.quickSearchContainer}>
          <Pressable
            style={buttonPress == 'antibiotic' ? styles.buttonHover : styles.button}
            onPressIn={() => setButtonPress('antibiotic')}
            onPressOut={() => setButtonPress(false)}
            onPress={() => true}
          >
            <Text style={{ color: '#FFF' }}>Antibióticos</Text>
          </Pressable>
          <Pressable
            style={buttonPress == 'anti-inflammatory' ? styles.buttonHover : styles.button}
            onPressIn={() => setButtonPress('anti-inflammatory')}
            onPressOut={() => setButtonPress(false)}
            onPress={() => true}
          >
            <Text style={{ color: '#FFF' }}>Anti inflamtório</Text>
          </Pressable>
          <Pressable
            style={buttonPress == 'analgesic' ? styles.buttonHover : styles.button}
            onPressIn={() => setButtonPress('analgesic')}
            onPressOut={() => setButtonPress(false)}
            onPress={() => true}
          >
            <Text style={{ color: '#FFF' }}>Analgésico</Text>
          </Pressable>
          <Pressable
            style={buttonPress == 'antiviral' ? styles.buttonHover : styles.button}
            onPressIn={() => setButtonPress('antiviral')}
            onPressOut={() => setButtonPress(false)}
            onPress={() => true}
          >
            <Text style={{ color: '#FFF' }}>Antiviral</Text>
          </Pressable>
        </View>
        <View style={styles.recentlySearch}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pesquisados recentemente:</Text>
          {
            isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <View style={styles.card} key={productData[0]?.id}>
                <Image source={{ uri: productData[0]?.imageUrl }} style={styles.image} />
                <Text style={styles.name}>{productData[0]?.name}</Text>
                <Text style={styles.description}>R$ {productData[0]?.price?.toFixed(2)}</Text>
                <Text style={styles.description}>{productData[0]?.quantity?.toFixed(0)} comprimidos</Text>
              </View>
            )
          }
        </View>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Search;
