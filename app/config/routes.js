import  {StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from '../screens/Home';
import CurrencyList from '../screens/currencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

const HomeStack = StackNavigator({
	Home:{
		screen: Home,
		navigationOptions: {
			header: () => null,
		}
	},
	Options: {
		screen: Options,
		navigationOptions: {
			headerTitle: 'Options',
		}
	},
	Themes: {
		screen: Themes,
		navigationOptions: {
			headerTitle: 'Themes',
		}
	}
}, {
	headerMode: 'screen',
}
);

const CurrencyListStack = StackNavigator({
	CurrencyList: {
		screen: CurrencyList,
		navigationOptions: ({navigation}) => ({
			headerTitle: navigation.state.params.title,
		}),
	  	},
}
);


export default StackNavigator(
	{
	Home:{
		screen: HomeStack
	},
	CurrencyList: {
		screen: CurrencyListStack,
	},
	}, 
	{
	mode: 'modal',
	cardStyle: { paddingTop: StatusBar.currentHeight},
	//makes it so there are no duplicate headers when moving between screens
	//this is because for anything in this section it is told to not generate a header
	//we have generated a header in the HomeStack above it
	headerMode: 'none'
	}
);