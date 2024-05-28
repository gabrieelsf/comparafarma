import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	footer: {
		display: 'flex',
		width: '100%',
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#B7F9E1',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
	},
  pressable: {
    padding: 5,
  },
	content: {
		display: 'flex',
		height: '55%',
		width: '70%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icons: {
		color: '#000',
	}
});

export default styles