import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer.js';

// composeEnhancers函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;

const storeEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, composeEnhancers(storeEnhancer));

export default store;
