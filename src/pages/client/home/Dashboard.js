import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const ProductCard = ({ imageUrl, name, price, quantity }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>R$ {price?.toFixed(2)}</Text>
      <Text style={styles.description}>{quantity?.toFixed(0)} comprimidos</Text>
    </View>
  );
};

const Dashboard = ({ navigation }) => {
  const [ productData, setProductData] = useState([]);
  const [ getImages,   setGetImages  ] = useState(false);
  const [ isLoading,   setIsLoading  ] = useState(true);

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
      {
        isLoading ? 
          <ActivityIndicator size="large" color="#000" />
        :
          <View style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {
                productData.length > 0
                  ? productData.map(product => (
                      <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                      />
                    ))
                  : <Text style={{ color: 'black' }}>Sem produtos</Text>
              }
            </ScrollView>
          </View>
      }
      <Footer navigation={navigation} />
    </View>
  );
};

export default Dashboard;
