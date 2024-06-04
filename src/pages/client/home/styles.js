import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 1024;

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
    paddingHorizontal: isLargeScreen ? 35 : 17,
    marginTop: isLargeScreen ? 140 : 140,
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
    width: isLargeScreen ? width / 4 - 15 : width / 2 - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },

  image: {
    width: '100%',
    height: isLargeScreen ? 250 : 150,
    marginBottom: 10,
    borderRadius: 8,
  },

  name: {
    fontSize: isLargeScreen ? 20 : 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    fontSize: isLargeScreen ? 18 : 16,
    color: '#333',
  },

  button: {
    color: '#FFFF',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1C1A58',
    width: '100%',
    marginTop: 5,
    borderRadius: 10
  },

  buttonHover: {
    color: '#FFFF',
    marginTop: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#151341',
    width: '100%',
    borderRadius: 10
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 600
  },

  buttonClose: {
    backgroundColor: '#1C1A58',
    marginTop: 10,
  },

  buttonCloseHover: {
    backgroundColor: '#151341',
    marginTop: 10,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
