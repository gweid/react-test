const { createStore, applyMiddleware } = require('../cRedux.js')
const logger = require('../middlewares/logger.js')
const thunk = require('../middlewares/thunk.js')

const initState = {
  name: 'zhangsan',
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'change_name':
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

// 这里可以看出来，applyMiddleware 就是一个生成 enhancer 的函数
const enhancer = applyMiddleware(logger, thunk)

const store = createStore(reducer, initState, enhancer)

store.subscribe(() => {
  console.log(store.getState());
})

const action = {
  type: 'change_name',
  payload: 'lisi',
}

store.dispatch(action)
