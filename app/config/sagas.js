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
	// so if their is no default action.currency like when first loaded, it will use the default in reduces/currencies file
		currency = yield select(state => state.currencies.baseCurrency);
	}
	//currency is the action that is passed from the rootSaga function ex. selecting AUD,
	//will result in AUD being called in the getLatestRate
	const response = yield call(getLatestRate, currency);
	//add yield for the conversion to happen first
	//now the reponse call from above is converted into a json object
	const result = yield response.json();

	if (result.error) {
		yield put({type: CONVERSION_ERROR, error: result.error});
	} else {
		// if there is a successful conversion result
		//it will go to CONVERSION_RESULT in reducers/currencies file
		yield put({type: CONVERSION_RESULT, result});
	}
  } catch (error) {
    yield put({ type: CONVERSION_ERROR, error: error.message });
  }
};

const rootSaga = function* () {
	// if any of these functions in another file are used, their actions are passed to fetchLatestConversionRates function
	yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
	yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
	yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
};

export default rootSaga;