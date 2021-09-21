import React, { useRef, Component, useEffect, useState, forwardRef } from 'react'

// ----------------------- useRef 获取 Dom
class TestRef1 extends Component {
  render() {
    return (
      <div>TestRef1</div>
    )
  }
}

// 包裹在 forwardRef 中之后，除了接受 props 参数，还接受 ref
const TestRef2 = forwardRef((props, ref) => {
  return (
    <div ref={ref}>TestRef2</div>
  )
})

const UseRefHook = () => {
  const pRef = useRef()
  const testRef1 = useRef()
  const testRef2 = useRef()

  const handleChangeP = () => {
    pRef.current.innerHTML= 'hello, world'
    console.log(testRef1.current)
    console.log(testRef2.current)
  }

  return (
    <div>
      <hr />
      <h2>useRef 的使用</h2>
      <p ref={pRef}>hello</p>
      <TestRef1 ref={testRef1} />

      {/* 函数组件不能直接绑定 ref，要想绑定 ref，函数组件需要包裹在 forwardRef 中 */}
      <TestRef2 ref={testRef2} />
      
      <button onClick={handleChangeP}>handleChangeP</button>
    </div>
  )
}

// ------------------------------ useRef 保存上一次的值
// const UseRefHook = () => {
//   const [count, setCount] = useState(0)

//   const countRef = useRef(0)

//   // 谨记 useEffect 的执行时机：是在组件渲染完成之后，才执行
//   useEffect(() => {
//     countRef.current = count
//   }, [count])

//   return (
//     <div>
//       <hr />
//       <h2>useRef 的使用</h2>
//       <h3>count上一次的值：{countRef.current}</h3>
//       <h3>count当前值：{count}</h3>
//       <button onClick={() => setCount(count + 10)}>+10</button>
//     </div>
//   )
// }

export default UseRefHook
