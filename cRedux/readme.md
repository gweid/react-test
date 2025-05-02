## 实现 redux



### redux 的核心 createStore



```js
createStore(reducer, preloadedState, enhancer)
```

createStore 接收三个参数：

- reducer：根据 action 类型对 store 状态进行派发更新
- preloadedState：预存储的 store 状态
- enhancer：对 store 的功能进行增强，比如中间件



当调用 createStore 的时候，会返回一个对象，这个对象有三个参数：

- getState：获取 store 状态
- dispatch：派发 action
- subscribe：订阅 store 变更



#### 实现简单版 createStore

```js
function createStore(reducer, preloadedState) {
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
    currentState = reducer(currentState, action)

    // 当状态发生改变时，调用所有的订阅函数
    listeners.forEach(listener => listener())
  }

  // 订阅 state 的变化
  // store.subscribe(() => {})
  function subscribe(listener) {
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
```



#### 参数类型约束

- 约束 reducer 必须是一个函数
- 约束 dispatch 的参数
  - 约束 action 必须是对象
  - 约束 action 必须要有 type 属性
- 约束订阅 subscribe 的参数 listener 必须是函数

```js
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
```

