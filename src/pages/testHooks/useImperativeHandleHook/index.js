import React, { forwardRef, useRef, useImperativeHandle } from 'react'

const TestCom = forwardRef((props, ref) => {

  const inputRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        // 使用子组件本身的 ref
        inputRef.current.focus()
      }
    }
  })

  return (
    <div>
      <input ref={inputRef} />
    </div>
  )
})

const UseImperativeHandleHook = () => {
  const testRef = useRef()

  const handleClick = () => {
    console.log(testRef)
    testRef.current.focus()
  }

  return (
    <div>
      <hr />
      <h2>useImperativeHandle的使用</h2>
      <TestCom ref={testRef} />
      <button onClick={handleClick}>点击</button>
    </div>
  )
}

export default UseImperativeHandleHook
