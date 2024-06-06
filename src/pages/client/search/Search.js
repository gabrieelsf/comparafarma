import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, Image, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({ navigation }) => {
  const [ buttonPress,  setButtonPress  ] = useState(false);
  const [ productData,  setProductData  ] = useState([]);
  const [ isLoading,    setIsLoading    ] = useState(true);
  const [ inputSearch,  setInputSearch  ] = useState('');
  const [ productFound, setProductFound ] = useState([]);

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

  const handleSearch = (filterByType) => {
    const founds = []
    for(let product of productData) {
      if(filterByType){
        if(product.type.toLowerCase().includes(filterByType.toLowerCase())) founds.push(product)
      }else {
        if(product.name.toLowerCase().includes(inputSearch.toLowerCase())) founds.push(product)
      }
    }
    if(founds.length) setProductFound(founds);
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={[styles.content, styles.inputContainer]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputWrapper}>
            <TextInput 
              placeholder={`Faça sua pesquisa...`}
              style={styles.input} 
              placeholderTextColor="#FFF"
              value={inputSearch}
              onChangeText={setInputSearch}
            />
            <Pressable style={styles.pressable} onPress={() => {
              setIsLoading(true)
              handleSearch()
              }}>
              <Icon style={{ color: '#FFF' }} size={15} name="search" />
            </Pressable>
          </View>
          <View style={styles.quickSearchContainer}>
            <Pressable
              style={buttonPress == 'antibiotic' ? styles.buttonHover : styles.button}
              onPressIn={() => setButtonPress('antibiotic')}
              onPressOut={() => setButtonPress(false)}
              onPress={() => handleSearch('antibiotic')}
            >
              <Text style={{ color: '#FFF' }}>Antibióticos</Text>
            </Pressable>
            <Pressable
              style={buttonPress == 'anti-inflammatory' ? styles.buttonHover : styles.button}
              onPressIn={() => setButtonPress('anti-inflammatory')}
              onPressOut={() => setButtonPress(false)}
              onPress={() => handleSearch('anti-inflammatory')}
            >
              <Text style={{ color: '#FFF' }}>Anti inflamtório</Text>
            </Pressable>
            <Pressable
              style={buttonPress == 'analgesic' ? styles.buttonHover : styles.button}
              onPressIn={() => setButtonPress('analgesic')}
              onPressOut={() => setButtonPress(false)}
              onPress={() => handleSearch('analgesic')}
            >
              <Text style={{ color: '#FFF' }}>Analgésico</Text>
            </Pressable>
            <Pressable
              style={buttonPress == 'antiviral' ? styles.buttonHover : styles.button}
              onPressIn={() => setButtonPress('antiviral')}
              onPressOut={() => setButtonPress(false)}
              onPress={() => handleSearch('antiviral')}
            >
              <Text style={{ color: '#FFF' }}>Antiviral</Text>
            </Pressable>
          </View>
          {!!productFound.length ?
            <Text style={{ fontWeight: 'bold', fontSize: 23, marginTop: 20 }}>Produtos encontrados:</Text>
            : <View style={styles.needHelp}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Em dúvida do que precisa?</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Navegue pelos produtos</Text>
              <Pressable
                style={buttonPress == 'homePage' ? styles.buttonHover : styles.button}
                onPressIn={() => setButtonPress('homePage')}
                onPressOut={() => setButtonPress(false)}
                onPress={() => navigation.navigate('home')}
              >
                <Text style={{ color: '#FFF' }}>Página principal</Text>
              </Pressable>
            </View>
          }
          {!!productFound.length &&
            <View style={styles.scrollView}>
              {productFound.map(product => (
                <View style={styles.card} key={product?.id}>
                  <Image source={{ uri: product?.imageUrl }} style={styles.image} />
                  <Text style={styles.name}>{product?.name}</Text>
                  <Text style={styles.description}>R$ {product?.price?.toFixed(2)}</Text>
                  <Text style={styles.description}>{product?.quantity?.toFixed(0)} comprimidos</Text>
                </View>
              ))}
            </View>
          }
          <View style={styles.recentlySearch}>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Search;
