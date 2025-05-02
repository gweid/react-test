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

function createStore(reducer, preloadedState) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer 必须是一个函数')

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
  createStore
}
