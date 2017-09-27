import React, {Component} from 'react';
import {View, StatusBar, KeyboardAvoidingView} from 'react-native';
import {Container} from '../components/Container';
import {Logo} from '../components/Logo/index';
import {InputWithButton} from '../components/TextInput/index';
import {ClearButton} from '../components/Button/index';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = .7974;
const TEMP_CONVERSION_DATE = new Date();

export default class Home extends Component {
	handlePressBaseCurrency = () => {
		console.log('press base');
	};
	handlePressQuoteCurrency = () => {
		console.log('press quote');
	};

	handleChangeText = (text) => {
		console.log('change text', text);
	};

  handleSwapCurrency = () => {
    console.log('press swap');
  };

  handleOptionPress = () => {
    console.log('option was pressed');
  };

render() {
   return (
      <Container>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress={this.handleOptionPress} />
        <KeyboardAvoidingView behavior='padding'>
        <Logo />
        <InputWithButton
          buttonText={TEMP_BASE_CURRENCY}
          onPress={this.handlePressBaseCurrency}
          defaultValue={TEMP_BASE_PRICE}
          keyboardType="numeric"
          onChangeText={this.handleChangeText}
        />
        <InputWithButton
          editable={false}
          buttonText={TEMP_QUOTE_CURRENCY}
          onPress={this.handlePressQuoteCurrency}
          value={TEMP_QUOTE_PRICE}
        />
        <LastConverted 
          date = {TEMP_CONVERSION_DATE}
          base = {TEMP_BASE_CURRENCY}
          quote = {TEMP_QUOTE_CURRENCY}
          conversionRate = {TEMP_CONVERSION_RATE}
        />
        <ClearButton text='Reverse Currencies' onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView >
      </Container>
		);
	}
}