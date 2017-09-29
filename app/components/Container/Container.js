// the name after import can be anything if there is a default export
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import styles from './styles';

const Container = ({children, backgroundColor}) => {
	const containerStyles = [styles.container];
	if (backgroundColor) {containerStyles.push({backgroundColor: backgroundColor});
	}
	return (
		<View style={containerStyles}>
			{children}
		</View>	
	);
}	

Container.propTypes = {
	children: PropTypes.any,
	backgroundColor: PropTypes.string,
};

export default Container;