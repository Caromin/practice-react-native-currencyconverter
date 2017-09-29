//1. for swap currency
//2. change base currency happens
//3. make remote request on initial app load
import {SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION} from '../actions/currencies';
//Allows us to listen to any actions we want to, when a certain action is commited, it will call a function that we specify
import {takeEvery} from 'redux-saga/effects';

const fetchLatestConversionRates = function* (action) {
  console.log('TODO: Update the things.', action);
  yield;
};
const rootSaga = function* () {
	//the secondary parameter is another function generator
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
};
export default rootSaga;