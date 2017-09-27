import React, {Component} from 'react';
import { FlatList, View, StatusBar} from 'react-native';
import currencies from '../data/currencies';
import {ListItem, Separator} from '../components/List';
import PropTypes from 'prop-types';

const TEMP_CURRENT_CURRENCY = 'CAD';

export default class CurrencyList extends Component {
	static propTypes = {
		navigation: PropTypes.object,
	}
	handlePress = () => {
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
					onPress={this.handlePress}
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