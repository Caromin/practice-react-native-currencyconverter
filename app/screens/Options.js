import React, {Component} from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {ListItem, Separator} from '../components/List';
import {Ionicons} from '@expo/vector-icons';

const ICON_COLOR = '#868686';
const ICON_SIZE = 23;


export default class Options extends Component {
	handleThemesPress = () => {
		console.log('theme press');
	}

	handleSitePress = () => {
		console.log(' press site');
	}

	render() {
		return (
			<ScrollView>
				<StatusBar translucent={false} barStyle="default" />
				<ListItem
					text="Themes"
					onPress={this.handleThemesPress}
					customIcon={<Ionicons name='ios-arrow-forward' color={ICON_COLOR} size={ICON_SIZE} />}
				/>
				<Separator />
				<ListItem
					text="Fixer.io"
					onPress={this.handleSitePress}
					customIcon={<Ionicons name='ios-link' color={ICON_COLOR} size={ICON_SIZE} />}

				/>
				<Separator />
			</ScrollView>	
		);
	};
};