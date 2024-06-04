import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, Pressable, Modal, Button } from 'react-native';
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
    await addDoc(collection(db, 'purchases'), { 
      product_id: product?.id, 
      user_email: auth.currentUser.email,
      created_at: new Date().getTime()
    });
    console.log('Produto adicionado com sucesso:', product);
  } catch (error) {
    console.error('Erro ao adicionar o produto:', error);
  }
};

const ProductCard = ({ id, imageUrl, name, price, quantity, buttonPress, setButtonPress, setSelectedProduct, setModalVisible }) => {
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
          setSelectedProduct({ id, imageUrl, name, price, quantity });
          setModalVisible(true);
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const confirmPurchase = async () => {
    if(selectedProduct) {
      await handleSubmit(selectedProduct);
      setModalVisible(false);
      setSelectedProduct(null);
    }
  };

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
                  setSelectedProduct={setSelectedProduct}
                  setModalVisible={setModalVisible}
                />
              ))
            ) : (
              <Text style={{ color: 'black' }}>Sem produtos</Text>
            )}
          </ScrollView>
        </View>
      )}
      <Footer navigation={navigation} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Confirmar compra de {selectedProduct?.name}?</Text>
          <Pressable
            style={buttonPress == 'confirm' 
              ? [styles.button, styles.buttonCloseHover]
              : [styles.button, styles.buttonClose]
            }
            onPress={() => {
              setButtonPress(false);
              confirmPurchase();
            }}
            onPressIn={() => setButtonPress('confirm')}
          >
            <Text style={styles.textStyle}>Confirmar</Text>
          </Pressable>
          <Pressable
            style={ buttonPress == 'cancel'
              ? [styles.button, styles.buttonClose, { backgroundColor: '#b72525' }]
              : [styles.button, styles.buttonClose, { backgroundColor: '#EC3535' }]
            }
            onPress={() => {
              setButtonPress(false);
              setModalVisible(false);
            }}
            onPressIn={() => setButtonPress('cancel')}
          >
            <Text style={styles.textStyle}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;