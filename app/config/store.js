import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

//expo default state is production not development
if (process.env.NODE_ENV === 'production') {
//logger middleware should be the last thing on the stack so it can listen to all to all of the actions in the stack
//think of logger as console that shows prev state, current, and next state of actions  
  middleware.push(logger);
}

//...middleware will use all functions(middleware/arguements) and return a function, then given to the next middleware dispatch
// So, the middleware signature is ({ getState, dispatch }) => next => action.
const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;