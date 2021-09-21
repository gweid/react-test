import React, { useReducer } from 'react'
import reducer from './reducer'
import TestUseReducer from './testUserReducer'

const UseReducerHook = () => {
  /**
   * useReducer 参数：
   *  第一个参数：reducer
   *  第二个参数：state 初始值
   */
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <hr />
      <TestUseReducer />
      <h2>useReducer</h2>
      <p>结果：{state.count}</p>
      <button onClick={() => dispatch({ type: 'add', payload: 5 })}>加+</button>
      <button onClick={() => dispatch({ type: 'reduce', payload: 5 })}>减-</button>
    </div>
  )
}

export default UseReducerHook
