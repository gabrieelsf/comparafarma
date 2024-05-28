import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, Pressable } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const handleSubmit = async (product = {}) => {
  try {
    const auth = getAuth();
    const db = getFirestore();
    await addDoc(collection(db, 'purchases'), { product_id: product?.id, user_email: auth.currentUser.email });
    console.log('Produto adicionado com sucesso:', product);
  } catch (error) {
    console.error('Erro ao adicionar o produto:', error);
  }
};

const ProductCard = ({ id, imageUrl, name, price, quantity, buttonPress, setButtonPress }) => {
  return (
    <View style={styles.card} key={id}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{capitalizeFirstLetter(name)}</Text>
      <Text style={styles.description}>R$ {price?.toFixed(2)}</Text>
      <Text style={styles.description}>{quantity?.toFixed(0)} comprimidos</Text>
      <Pressable
        style={buttonPress == id ? styles.buttonHover : styles.button}
        onPress={() => {
          setButtonPress(false);
          handleSubmit({ id, imageUrl, name, price, quantity });
        }}
        onPressIn={() => setButtonPress(id)}
      >
        <Text style={{ color: '#FFFF' }}>Comprar</Text>
      </Pressable>
    </View>
  );
};

const Dashboard = ({ navigation }) => {
  const [productData, setProductData] = useState([]);
  const [getImages, setGetImages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonPress, setButtonPress] = useState(false);

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
      setGetImages(true)
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const getImageUrls = async () => {
      const storage = getStorage();
      const updatedProducts = await Promise.all(productData.map(async product => {
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

    if (productData.length > 0) {
      getImageUrls();
      setGetImages(false)
    }
  }, [getImages]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {productData.length > 0 ? (
              productData.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  buttonPress={buttonPress}
                  setButtonPress={setButtonPress}
                />
              ))
            ) : (
              <Text style={{ color: 'black' }}>Sem produtos</Text>
            )}
          </ScrollView>
        </View>
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

export default Dashboard;
