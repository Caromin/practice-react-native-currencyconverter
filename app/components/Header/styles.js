import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		//easy for ios, its a check to see if the phone is an ios then it will use this padding {media query}
		'@media ios': {
			paddingTop: 20
		}
	},
	button: {
		alignSelf: 'flex-end',
		paddingVertical: 5,
		paddingHorizontal: 20,

	},
	icon: {
		width: 18,
	}

});