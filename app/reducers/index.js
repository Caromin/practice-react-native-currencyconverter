import { combineReducers } from 'redux';
import currencies from './currencies';
import theme from './themes';
//used to organize reducers
export default combineReducers({
	currencies,
	theme,
});