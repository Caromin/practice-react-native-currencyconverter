//deleted swapCurrency, changeCurrencyAmount  from import was used for console.log checking below
import { CHANGE_CURRENCY_AMOUNT, SWAP_CURRENCY,CHANGE_BASE_CURRENCY, CHANGE_QUOTE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR} from '../actions/currencies';

//old example used for previous setup
// const initialState = {
// 	baseCurrency: 'USD',
// 	quoteCurrency: 'GBP',
// 	amount: 100,
// 	error: null,
// 	conversions: {},
// };

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

//if im understanding this correctly, if state.conversion[action.currency] is true, meaning it exist in the data state,
//then set it equal to conversion, now return action.corrency as conversion
//example if AUD exists locally, then conversion = AUD and it will return AUD
//this function is not set up 
const setConversions = (state, action) => {
	// this is checking inside of initialState/existing state
	//checking if example GBP exists there
	// conversion is just a random assigned variable local scope
	let conversion = {
		isFetching: true,
		date: '',
		rates: {},
	};
	//check to see if action.currency does exist, if it does then it will use the data, save time from remote api call
	if (state.conversions[action.currency]) {
		//will copy what is already in the initialState
		//if it does not exist it will default to the original conversion with blank date and rate
		conversion = state.conversions[action.currency];
	}
	return {
		//...state.conversions this copies all of the exisiting conversions information
		...state.conversions,
		//update current new base or quote currency is
		[action.currency]: conversion,
	}
};


//should have state equal to something, so its easier to know the starting point of the state
//this is the reducer function
//REMEMBER STATE = INITIALSTATE, ACTION IS A PROP FROM THE ACTION.js folder
export default (state = initialState, action) => {
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
   
			};
		case CHANGE_BASE_CURRENCY: 
			return {
				...state,
        		baseCurrency: action.currency,
		        conversions: setConversions(state, action),
			};
		case CHANGE_QUOTE_CURRENCY:
			return {
				...state,
				quoteCurrency: action.currency,
		        conversions: setConversions(state, action),
			};	
		case GET_INITIAL_CONVERSION:
			return {
				...state,
		        conversions: setConversions(state, {currency: state.baseCurrency}),
			};
		case CONVERSION_RESULT: 
			return {
				...state,
				baseCurrency: action.result.base,
				conversions: {
					...state.conversions,
					[action.result.base] : {
						isFetching: false,
						...action.result,
					}
				}
			};	
		case CONVERSION_ERROR:
			return {
				...state, 
				error: action.error,
			};
		default: 
			return state;
	}
};

// test to see if the initial state was displaying, yes
// console.log('swapcurrency', reducer(initialState, swapCurrency()));
// console.log('swap amount', reducer(initialState, changeCurrencyAmount(222)));