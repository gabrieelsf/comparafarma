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
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 140,
    marginBottom: 70,
  },

  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
    width: width / 2 - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10
  },

  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    fontSize: 16,
    color: '#333',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
});

export default styles;
