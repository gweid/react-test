// 判断是否是对象类型
function isPlainObject(obj) {
  // 排除掉 null 和基本数据类型
  if (typeof obj !== 'object' || obj === null) return false

  // 区分数组和对象
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

function compose(...funcs) {
  return function (dispatch) {
    // 逆序遍历，这里[logger, thunk] 两个中间件，最后返回的 dispatch 就是 logger 中间件，logger 中间件中执行的 next 就是 thunk 中间件，这就符合洋葱模型了
    for (let i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function applyMiddleware(...middlewares) {
  // 这个函数就相当于 enhancer 了
  return function(createStore) {
    return function(reducer, preloadedState) {
      const store = createStore(reducer, preloadedState)

      // 传给中间件的 store 阉割版的 store
      const middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch,
      }

      const chain = middlewares.map(middleware => middleware(middlewareAPI))

      const dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch,
      }
    }
  }
}

function createStore(reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer 必须是一个函数')

  // 判断 enhancer 有没有传，并且是不是一个函数
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer 必须是一个函数')
    }

    // 调用 enhancer 函数, 并且把 createStore 作为参数传递给 enhancer
    // 返回一个新的经过增强的 store
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentState = preloadedState
  const listeners = []

  // 获取 state
  // store.getState()
  function getState() {
    return currentState
  }

  // 触发 action
  // const action = { type: 'xxx' }
  // store.dispatch(action)
  function dispatch(action) {
    // 约束 action 必须是一个对象
    if(!isPlainObject(action)) throw new Error('action 必须是一个对象')
    // action 必须有 type 属性
    if(typeof action.type === 'undefined') throw new Error('action 必须有 type 属性')

    currentState = reducer(currentState, action)

    // 当状态发生改变时，调用所有的订阅函数
    listeners.forEach(listener => listener())
  }

  // 订阅 state 的变化
  // store.subscribe(() => {})
  function subscribe(listener) {
    if (typeof listener !== 'function') throw new Error('listener 必须是一个函数')
    listeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

module.exports = {
  createStore,
  applyMiddleware
}
