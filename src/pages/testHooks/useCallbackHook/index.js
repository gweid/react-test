import React, { useState, useCallback, memo } from 'react'

// --------------------------------错误的使用方式
// const UseCallbackHook = () => {
//   // const handleClick = () => {
//   //   console.log('useCallback')
//   // }

//   const handleClick = useCallback(() => {
//     console.log('useCallback')
//   }, [])

//   return (
//     <div>
//       <hr />
//       <h2>useCallback的使用</h2>
//       <button onClick={handleClick}>
//         useCallback
//       </button>
//     </div>
//   )
// }

//----------------------------------正确的使用方式
const GButton = memo(({ title, addFunc }) => {
  console.log(`${title}重新渲染了`)

  return (
    <button onClick={addFunc}>GButton</button>
  )
})

const UseCallbackHook = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const add1 = () => {
    setCount1(count1 + 1)
  }

  const add2 = useCallback(() => {
    setCount2(count2 + 1)
  }, [count2])

  return (
    <div>
      <hr />
      <h2>useCallback的使用</h2>
      <GButton title={'button1'} addFunc={add1} />
      <GButton title={'button2'} addFunc={add2} />
    </div>
  )
}

export default UseCallbackHook
