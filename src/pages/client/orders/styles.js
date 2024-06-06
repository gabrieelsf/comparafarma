import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150,
  },

  scrollContainer: {
    flexDirection: 'column',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },

  orderContainer : {
    backgroundColor: '#FFF',
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  orderDescription: {
    height: '100%',
    marginVertical: 20,
    marginTop: 40
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    padding: 15,
    height: '90%',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});

export default styles