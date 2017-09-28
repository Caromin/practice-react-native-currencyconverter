import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers';

//expo default state is production not development
const middleware = [];
if (process.env.NODE_ENV === 'production') {
  middleware.push(logger);
}

//...middleware will use all functions(middleware/arguements) and return a function, then given to the next middleware dispatch
// So, the middleware signature is ({ getState, dispatch }) => next => action.
const store = createStore(reducer, applyMiddleware(...middleware));

export default store;