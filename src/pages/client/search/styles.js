import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputContainer: {
    marginTop: 140, 
  },

  input: {
    color: '#FFFF',
    height: 60,
    width: '90%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#1C1A58',
    borderRadius: 10,
  },

  quickSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '98%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  button: {
    color: '#FFFF',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1C1A58',
    width: '45%',
    marginTop: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  buttonHover: {
    color: '#FFFF',
    marginTop: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#151341',
    width: '45%',
    borderRadius: 10,
    marginHorizontal: 5,
  },

  recentlySearch: {
    width: '90%',
    height: '40%',
    marginTop: 100,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    padding: 15,
    height: '80%',
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

export default styles;
