//Explaination on how reverse currencies is used when the reverse currencies action is press
//it will run the swapCurrency() which is in actions, which is then exported into the reducers.js
//once in the reducers file it will look for the specific action type and will return whatever it is told to return
//state.currencies.baseCurrency is the example state is the props looking at it, currencies, is the combinedreducers of all states
//and baseCurrency is the specific variable to look to update
import React, {Component} from 'react';
import {View, StatusBar, KeyboardAvoidingView} from 'react-native';
import {Container} from '../components/Container';
import {Logo} from '../components/Logo/index';
import {InputWithButton} from '../components/TextInput/index';
import {ClearButton} from '../components/Button/index';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';
import PropTypes from 'prop-types';
import { changeCurrencyAmount, swapCurrency, getInitialConversion } from '../actions/currencies';
//connects functions to this.props.dispatch
import {connect} from 'react-redux';
import {connectAlert} from '../components/Alert';

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
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };

  //this will be called before the home screen mounts
  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  };

  //have access to this.props and also the props in nextProps
  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      //error = type, Error = title, nextProps.currencyError = state.currencies.error which starts at null
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

	handlePressBaseCurrency = () => {
    //when this button is presseed, navigate to a new screen
    this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
	};
	handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
	};

  handleChangeText = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

render() {
  let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
    quotePrice = '...';
    }
     return (
       <Container backgroundColor={this.props.primaryColor}>
         <StatusBar backgroundColor="blue" barStyle="light-content" />
         <Header onPress={this.handleOptionsPress} />
         <KeyboardAvoidingView behavior="padding">
           <Logo tintColor={this.props.primaryColor} />
           <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor={this.props.primaryColor}
           />
           <InputWithButton
            editable={false}
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            value={quotePrice}
            textColor={this.props.primaryColor}
           />
           <LastConverted
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
            base={this.props.baseCurrency}
            quote={this.props.propsquoteCurrency}
           />
           <ClearButton onPress={this.handleSwapCurrency} text="Reverse Currencies" />
         </KeyboardAvoidingView>
      </Container>
		);
	};
};

//passing the redux state and passing it to props
//state = redux state, currencies is the reducer combiner, baseCurrency,etc are the props that will change
//basically these are the props that are constantly being looked at for changes
const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    //this is saying look at initialstate rates and grab the number for example AUD which is 1.34 to USD
    conversionRate: rates[quoteCurrency] || 0,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    isFetching: conversionSelector.isFetching,
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

// the (Home) is a parameter that is being passed over
export default connect(mapStateToProps)(connectAlert(Home));