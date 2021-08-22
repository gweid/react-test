/**
 * 实现 redux 中间件
 */

const redux = require('redux')

const initState = {
  count: 0
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_NUMBER':
      return {...state, count: state.count + action.number}
    default:
      return state
  }
}

const store =  redux.createStore(reducer)

// // 可以在派发 action 之前，订阅 store 变化
// store.subscribe(() => {
//   console.log(store.getState());
// });

const action = {
  type: 'ADD_NUMBER',
  number: 5
}

// 1、基本做法
// console.log('dispatch之前', initState)
// store.dispatch(action)
// console.log('dispatch之后', store.getState())


// 2、封装成一个函数
// function loggingMiddleWare(store, action) {
//   console.log('dispatch之前', initState)
//   store.dispatch(action)
//   console.log('dispatch之后', store.getState())
// }
// // 但是使用 redux 更期望的是通过 store.dispatch 的方式调用 action，而不是调用一个函数
// loggingMiddleWare(store, action)


// 3、hack 的方式：进行优化: 修改原有的dispatch
// const next = store.dispatch
// function loggingMiddleWare(action) {
//   console.log('dispatch之前', initState)
//   next(action)
//   console.log('dispatch之后', store.getState())
// }
// store.dispatch = loggingMiddleWare

// store.dispatch(action)


// 4、将第三种方式包装成函数
function loggingMiddleWare(store) {
  const next = store.dispatch

  function middleWare(action) {
    console.log('dispatch之前', initState)
    next(action)
    console.log('dispatch之后', store.getState())
  }

  return middleWare
}

function patchThunk(store) {
  const next = store.dispatch

  function middleWare(action) {
    console.log('patchThunk中间件')
    next(action)
  }

  return middleWare
}

function applyMiddleware(...middleware) {
  const newMiddleWare = [...middleware]
  newMiddleWare.forEach(mw => {
    store.dispatch = mw(store)
  })
}

applyMiddleware(loggingMiddleWare, patchThunk)

store.dispatch(action)