/**
 * redux 的基本使用
 */
import redux from 'redux';

// 1、创建一个 state
const initState = {
  count: 0
}

// 2、创建一个 reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_NUMBER':
      return {...state, count: state.count + action.number};
    default:
      return state;
  }
}

// 3、根据 reducer 创建一个 store 来存储 state
const store = redux.createStore(reducer);

// 可以通过 store.getState() 来获取当前 state
// console.log(store.getState());

// 可以在派发 action 之前，监听 store 变化
// store.subscribe(() => {
//   console.log(store.getState());
// });

// 4、通过 action 来修改 state
store.dispatch({
  type: 'ADD_NUMBER',
  number: 5
});