import React, { useEffect, useRef, useState } from "react"

const RefCache = () => {
  const [count, setCount] = useState(1)
  const currentRef = useRef({ name: 'jack' })

  const handleClick = () => {
    currentRef.current.name = 'mike'

    console.log(currentRef);
  }

  const handleClickState = () => {
    setCount(2)
  }

  useEffect(() => {
    console.log('进行更新了');
  })

  return (
    <div>
      <div>ref 的缓存作用</div>
      <button onClick={handleClick}>ref缓存</button>
      <button onClick={handleClickState}>state改变</button>
    </div>
  )
}

export default RefCache
