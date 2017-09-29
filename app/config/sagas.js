//1. for swap currency
//2. change base currency happens
//3. make remote request on initial app load
import {
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  SWAP_CURRENCY,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';
//takeEvery Allows us to listen to any actions we want to, when a certain action is commited, it will call a function that we specify
//call allows us to specify a function as a first parameter, reason to use is easier for testing purposes
//put it returns an object
import { takeEvery, call, put, select } from 'redux-saga/effects';

export const getLatestRate = currency => fetch(`https://api.fixer.io/latest?base=${currency}`);

const fetchLatestConversionRates = function* (action) {
  try {
	let currency = action.currency;
	if (currency === undefined) {
	//select gives us access to the entire redux state
		currency = yield select(state => state.currencies.baseCurrency);
	}
	const response = yield call(getLatestRate, currency);
	//add yield for the conversion to happen first
	const result = yield response.json();

	if (result.error) {
		yield put({type: CONVERSION_ERROR, error: result.error});
	} else {
		// if there is a successful conversion result
		yield put({type: CONVERSION_RESULT, result});
	}
  } catch (error) {
    yield put({ type: CONVERSION_ERROR, error: error.message });
  }
};

const rootSaga = function* () {
	yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
	yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
	yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
};

export default rootSaga;