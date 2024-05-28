import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Footer from '../../components/footer/footer';

const Search = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>SEARCH</Text>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};

export default Search;
