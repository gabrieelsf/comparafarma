import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile: {
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  profileIcon: {
    backgroundColor: '#1C1A58',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 5,
  },

  button: {
    color: '#FFFF',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#1C1A58',
    width: '80%',
    marginTop: 5,
    borderRadius: 10
  },

  buttonHover: {
    color: '#FFFF',
    marginTop: 5,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#151341',
    width: '80%',
    borderRadius: 10
  },
});

export default styles