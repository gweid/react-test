import React, { Suspense, useState } from "react";
import AysncComponent from './AysncComponent';

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'jack',
        type: '1'
      })
    }, 1000)
  })
}

const TestCom = ({ data }) => {

  const { name } = data

  return (
    <div>名字：{name}</div>
  )
}

const LazySuspense = () => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const LazyTest = AysncComponent(TestCom, fetchData)

  return (
    <div>
      <h1>-------------- React.lazy + Susponse模拟异步组件功能 -------------- </h1>
      <div style={{ padding: '40px' }}>
        <button onClick={handleClick}>渲染</button>
        {
          open && (
            <Suspense fallback={<div>loading...</div>}>
              <LazyTest />
            </Suspense>
          )
        }
      </div>
    </div>
  )
}

export default LazySuspense
