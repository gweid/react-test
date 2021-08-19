import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer.js';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // 开启 trace 可以追踪到具体源码位置
      trace: true
    }) : compose;

// 使用 redux-thunk 中间件
// applyMiddleware(中间件1, 中间件2, ...)
const enhancer = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, composeEnhancers(enhancer));

export default store;