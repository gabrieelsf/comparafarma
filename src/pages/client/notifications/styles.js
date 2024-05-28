import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 140,
    marginBottom: 70,
  },

  card: {
    backgroundColor: '#1C1A58',
    borderRadius: 8,
    marginBottom: 5,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
});

export default styles;
