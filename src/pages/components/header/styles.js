import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: '90%',
		marginLeft: 23,
		display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
		marginTop: 50,
    top: 0,
    zIndex: 1,
		borderRadius: 100,
		borderColor: '#000',
		borderWidth: 1.2,
  },

	content: {
		display: 'flex',
		height: '55%',
		width: '60%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center'
	},
	
	profile: {
    backgroundColor: '#1C1A58',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 5,
	}
});

export default styles;
