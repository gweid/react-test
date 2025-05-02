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



