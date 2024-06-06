import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/Header';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const auth = getAuth()

const Orders = ({ navigation }) => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState(false);

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

      const getPurchases = async () => {
        const db = getFirestore();
        const productCollection = collection(db, 'purchases');
        const snapshot = await getDocs(productCollection);
        const purchasesListed = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPurchases(purchasesListed);
      };

      await getImageUrls();
      await getPurchases();
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const purchased = productData.some(product =>
      purchases.find(purchase => product.id === purchase.product_id && auth?.currentUser?.email == purchase?.user_email)
    );
    setPurchasedProducts(purchased);
  }, [productData, purchases]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {
            isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : productData.map((product) => { 
              const purchase = purchases.find((purchase) => product.id === purchase.product_id && auth.currentUser.email == purchase.user_email)
              if(purchase){
                return (
                  <View style={styles.orderContainer} key={product.id}>
                    <View style={styles.orderDescription}>
                      <Text style={styles.description}>{format(new Date(purchase.created_at), 'EEEE, dd/MM/yyyy', { locale: ptBR })}</Text>
                      <Text style={styles.description}>{product.sold_by}</Text>
                    </View>
                    <View>
                      <Image source={{ uri: product.imageUrl }} style={styles.image} />
                      <Text style={styles.name}>{product.name}</Text>
                      <Text style={styles.description}>R$ {product.price?.toFixed(2)}</Text>
                      <Text style={styles.description}>{product.quantity?.toFixed(0)} comprimidos</Text>
                    </View>
                  </View>
                );
              }
              return null;
            })
          }
          {
            purchasedProducts ? null : <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Nenhum produto adiquirido </Text>
          }
        </ScrollView>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Orders;
