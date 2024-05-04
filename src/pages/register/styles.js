import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  form: {
    height: '30%',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    color: '#FFFF',
    height: 60,
    width: '100%',
    margin: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#1C1A58',
    borderRadius: 10
  },

  button: {
    color: '#FFFF',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#34D399',
    width: '100%',
    marginTop: 5,
    borderRadius: 10
  },

  buttonHover: {
    color: '#FFFF',
    marginTop: 5,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#2eba87',
    width: '100%',
    borderRadius: 10
  },

  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputShort: {
    color: '#FFFF',
    height: 60,
    width: '48%',
    margin: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#1C1A58',
    borderRadius: 10
  }
});

export default styles