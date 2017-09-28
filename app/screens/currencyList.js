import React, {Component} from 'react';
import { FlatList, View, StatusBar} from 'react-native';
import currencies from '../data/currencies';
import {ListItem, Separator} from '../components/List';
import PropTypes from 'prop-types';
import {changeBaseCurrency, changeQuoteCurrency} from '../actions/currencies';
import {connect} from 'react-redux';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
	static propTypes = {
		navigation: PropTypes.object,
		dispatch: PropTypes.func,
	}
	handlePress = (currency) => {
		//pull type from the home screen to this screen
		const {type} = this.props.navigation.state.params;
			if (type === 'base') {
				this.props.dispatch(changeBaseCurrency(currency));
			} else if (type === 'quote') {
				this.props.dispatch(changeQuoteCurrency(currency));
			}

		this.props.navigation.goBack(null);
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle='default' translucent={false} />
				<FlatList 
					data={currencies}
					//item is the current item, renderItem is used for array destructuring, similar to a for loop
					renderItem={({ item }) => (
					<ListItem
					text={item}
					selected={item === TEMP_CURRENT_CURRENCY}
					//item is the currency that has been selected
					onPress={() => this.handlePress(item)}
					visible={true}
					checkmark={true}
					/>
					)}
					keyExtractor={item => item}
					ItemSeparatorComponent={Separator}
				/>
			</View>
		);	
	}
	}

//passing currencyList to the connect function
export default connect()(CurrencyList);