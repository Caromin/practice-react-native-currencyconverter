import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableHighlight, TextInput, Text} from 'react-native';
import styles from './styles';
import color from 'color';

//as the whole app is getting rendered, it is grabbing the infomation components, onpress, button press, editable
//from the home.js to complete itself.
const InputWithButton = (props) => {
	//i am calling all of these const variables props to shorten calling the property
	//instead of props.onpress it is now onpress
	//...props is es2015 shortcut to loop through everything, in this case its everything in const props
	const {onPress, buttonText, editable = true} = props;

	//local color variable that uses a color library and the local styles sheet to darken button by 0.1 when pressed
	const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);

	//styles.container is in brackets because it is a one object array
	const containerStyles = [styles.container];
	if (editable === false) {
		containerStyles.push(styles.containerDisabled);
	}

	return (
	<View style={containerStyles}>
		<TouchableHighlight underlayColor={underlayColor} style={styles.buttonContainer} onPress={onPress}>
		<Text style={styles.buttonText} >{buttonText}</Text>
		</TouchableHighlight>
		<View style={styles.border} />

		<TextInput style={styles.input} {...props}/>
	</View>
	)
;}

//this is a prerequist to check if the correct type of property is sent.
//example when the onpress property is called, then it should be a function, if not error will send,
//maybe to console.log or break code.
InputWithButton.propTypes= {
	onPress: PropTypes.func,
	buttonText: PropTypes.string,
	editable: PropTypes.bool,
};

export default InputWithButton;