//deleted swapCurrency, changeCurrencyAmount  from import was used for console.log checking below
import { CHANGE_CURRENCY_AMOUNT, SWAP_CURRENCY} from '../actions/currencies';

const initialState = {
	baseCurrency: 'USD',
	quoteCurrency: 'GBP',
	amount: 100,
	error: null,
	conversions: {},
};

//should have state equal to something, so its easier to know the starting point of the state
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_CURRENCY_AMOUNT:
			return {
				//the ... copies everything already in the state
				...state,
				amount: action.amount || 0,
			};
		case SWAP_CURRENCY:
			return {
				...state,
				baseCurrency: state.quoteCurrency,
				quoteCurrency: state.baseCurrency,
   
			}
		default: 
			return state;
	}
};

// test to see if the initial state was displaying, yes
// console.log('swapcurrency', reducer(initialState, swapCurrency()));
// console.log('swap amount', reducer(initialState, changeCurrencyAmount(222)));


export default reducer;