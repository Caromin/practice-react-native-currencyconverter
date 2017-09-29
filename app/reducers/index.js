import { combineReducers } from 'redux';
import currencies from './currencies';
import theme from './theme';
//used to organize reducers
export default combineReducers({
	currencies,
	theme,
});