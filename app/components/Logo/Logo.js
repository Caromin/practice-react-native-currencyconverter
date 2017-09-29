import React, {Component} from 'react';
import {View, Image, Text, Keyboard, Animated} from 'react-native';
import styles from './styles'
import PropTypes from 'prop-types';

const ANIMATION_DURATION = 250;

class Logo extends Component {
	static propTypes = {
		tintColor: PropTypes.string,
	}

	constructor(props) {
		super(props);
		//below is saying that the default animated values are large for both, but because they 
		//are react props they are being listened too for any changes
		this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
		this.imageWidth = new Animated.Value(styles.$largeImageSize);
	};

	componentDidMount() {
		//keyboardwillshow is the parameter that it will listen for, and if it happens
		//it will run the function keyboardShow
		this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShow);
		this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHide);
	};
		//once the keyboard disappears from the DOM screen, this will run 
	componentWillUnmount() {
		this.keyboardShowListener.remove();
		this.keyboardHideListener.remove();
	};

	keyboardShow = () => {
		//parellel() is used if you want multiple animations to happen at the same time
		//they are grouped into an array and start() at the same time
		Animated.parallel([
			Animated.timing(this.containerImageWidth, {
				duration: ANIMATION_DURATION,
				toValue: styles.$smallContainerSize,
				}),
			Animated.timing(this.imageWidth, {
				duration: ANIMATION_DURATION,
				toValue: styles.$smallImageSize,
				})
		]).start();
	};

	keyboardHide = () => {
		Animated.parallel([
			Animated.timing(this.containerImageWidth, {
				duration: ANIMATION_DURATION,
				toValue: styles.$largeContainerSize,
				}),
			Animated.timing(this.imageWidth, {
				duration: ANIMATION_DURATION,
				toValue: styles.$largeImageSize,
				})
		]).start();
	};

	render() {
	//an array first applys the styles.containerImage, then width and height is replaced by the follow two
	const containerImageStyle = [
	   styles.containerImage,
	    { width: this.containerImageWidth, height: this.containerImageWidth },
	];

	const imageStyle = [
		styles.logo, 
		{width: this.imageWidth},
		//if the tiltColor does exist, in this cause it does, use this.props.tiltColor, otherwise null
		this.props.tintColor ? { tintColor: this.props.tintColor } : null,
	];

		return (
			<View style={styles.container}>
				<Animated.Image 
					resizeMode='contain' 
					style={containerImageStyle} 
					source={require('./images/background.png')} >
				<Animated.Image 
					resizeMode='contain' 
					style={imageStyle} 
					source={require('./images/logo.png')} 
				/>
				</Animated.Image>
				<Text style={styles.Text}>Currency Converter</Text>
			</View>
		);
	}
}

export default Logo;