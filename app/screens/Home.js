import React, {Component} from 'react';
import {View, StatusBar, KeyboardAvoidingView} from 'react-native';
import {Container} from '../components/Container';
import {Logo} from '../components/Logo/index';
import {InputWithButton} from '../components/TextInput/index';
import {ClearButton} from '../components/Button/index';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';
import PropTypes from 'prop-types';
import { changeCurrencyAmount, swapCurrency } from '../actions/currencies';
import {connect} from 'react-redux';
 
const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = .7974;
const TEMP_CONVERSION_DATE = new Date();


class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    isFetching: PropTypes.bool,
  };

	handlePressBaseCurrency = () => {
    //when this button is presseed, navigate to a new screen
    this.props.navigation.navigate('CurrencyList', {title: 'Base Currency'});
	};
	handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency'});
	};

  handleChangeText = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
}

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionPress = () => {
    this.props.navigation.navigate('Options');
  };

render() {
     return (
       <Container>
         <StatusBar backgroundColor="blue" barStyle="light-content" />
         <Header onPress={this.handleOptionsPress} />
         <KeyboardAvoidingView behavior="padding">
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
            date={TEMP_CONVERSION_DATE}
            conversionRate={TEMP_CONVERSION_RATE}
            base={TEMP_BASE_CURRENCY}
            quote={TEMP_QUOTE_CURRENCY}
           />
           <ClearButton onPress={this.handleSwapCurrency} text="Reverse Currencies" />
         </KeyboardAvoidingView>
      </Container>
		);
	};
};

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;

  return {

  };
};

//these are commented out, not sure why visually they are not shown this way
// the (Home) is a parameter that is being passed over

export default connect(mapStateToProps)(Home);