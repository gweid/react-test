const { createStore } = require('../cRedux.js')

const initState = {
  name: 'zhangsan',
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'chnage_name':
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

function enhancer(createStore) {
  return function (reducer, preloadedState) {
    const store = createStore(reducer, preloadedState)

    const dispatch = store.dispatch

    function _dispatch(action) {
      // 如果 action 是一个函数，那么是异步代码
      if (typeof action === 'function') {
        return action(dispatch)
      }

      dispatch(action)
    }

    return {
      ...store,
      dispatch: _dispatch,
    }
  }
}

const store = createStore(reducer, initState, enhancer)

store.subscribe(() => {
  console.log(store.getState());
})

// const action = {
//   type: 'chnage_name',
//   payload: 'lisi',
// }

// 经过 enhancer 增强之后的 dispatch 可以支持异步代码
const action = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'chnage_name',
      payload: 'lisi',
    })
  }, 1000)
}

store.dispatch(action)
