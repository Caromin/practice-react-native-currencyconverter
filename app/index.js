import React from 'react';
import EStylesheet from 'react-native-extended-stylesheet';
import Navigator from './config/routes';
import {AlertProvider} from './components/Alert';
import { Provider } from 'react-redux';
import store from './config/store';

//can use this to be a global scope for multiple stylesheets, allowing for easier updating
//This is the final js page that pulls from home.js and lauches the full product to the app
EStylesheet.build({
	$primaryBlue: '#4F6D7A',
	$primaryOrange: '#D57A66',
	$primaryGreen: '#00BD9D',
	$primaryPurple: '#9E768F',
	$white: '#FFF',
	$border: '#E2E2E2',
	$inputText: '#797979',
	$lightGray: '#F0F0F0',
	$darkText: '#343434'

	//helpfully to show how each component is layed out, great tool
	outline: 1
});

export default () => (
  <Provider store={store}>
    <AlertProvider>
      <Navigator onNavigationStateChange={null} />
    </AlertProvider>
  </Provider>
);