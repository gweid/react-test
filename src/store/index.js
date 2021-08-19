import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer.js';

// 使用 redux-thunk 中间件
// applyMiddleware(中间件1, 中间件2, ...)
const enhancer = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, enhancer);

export default store;