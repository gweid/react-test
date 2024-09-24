import React, { Fragment, useEffect, useRef, useState } from "react"
import ColorCircle from './ColorCircle'

// 未优化版本
// const WrapCom = () => {
//   const [position, setPosition] = useState({ width: 0, height: 0 })
//   const [dataList, setDataList] = useState([])
//   const [renderList, setRenderList] = useState([])

//   const warpRef = useRef()

//   useEffect(() => {
//     const { offsetHeight, offsetWidth } = warpRef.current
//     const originList = new Array(20000).fill(1)

//     setPosition({
//       width: offsetWidth,
//       height: offsetHeight
//     })
//     setDataList(originList)
//     setRenderList(originList)
//   }, [])

//   return (
//     <div ref={warpRef} style={{ width: '90%', height: '500px', position: 'relative' }}>
//       {
//         renderList.map((item, index) => <ColorCircle position={position} key={index} />)
//       }
//     </div>
//   )
// }


// 使用时间分片优化版本
const WrapCom = () => {
  const [position, setPosition] = useState({ width: 0, height: 0 })
  const [renderList, setRenderList] = useState([])

  // 每次渲染 500 个
  const renderParam = useRef({
    totalNum: 20000, // 总数
    renderNum: 500, // 每次渲染数
    renderTimes: 0, // 渲染次数
    dataList: [], // 原始数组
    currentIndex: 1, // 当前渲染到第几次
  })

  const warpRef = useRef()

  useEffect(() => {
    const { totalNum, renderNum, currentIndex } = renderParam.current
    const originList = new Array(totalNum).fill(1)
    renderParam.current.dataList = originList

    // 计算出需要渲染多少次
    const renderTimes = Math.ceil(totalNum / renderNum)
    renderParam.current.renderTimes = renderTimes

    const currentList = originList.slice(0, currentIndex * renderNum)

    const { offsetHeight, offsetWidth } = warpRef.current
    setPosition({
      width: offsetWidth,
      height: offsetHeight
    })

    setRenderList(currentList)
  }, [])

  useEffect(() => {
    if (renderList.length > 0) {
      requestIdleCallback(() => {
        handleRender()
      })
    }
  }, [renderList])

  const handleRender = () => {
    const { currentIndex, renderTimes, renderNum, dataList } = renderParam.current
    if (currentIndex <= renderTimes) {
      const currentList = dataList.slice((currentIndex - 1) * renderNum, currentIndex * renderNum)
      setRenderList([...renderList, ...currentList])
      renderParam.current.currentIndex = currentIndex + 1
    }
  }

  return (
    <div ref={warpRef} style={{ width: '90%', height: '500px', position: 'relative', margin: '0 auto' }}>
      {
        renderList.map((item, index) => <ColorCircle position={position} key={index} />)
      }
    </div>
  )
}


const TimeSlice = () => {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setTimeout(() => {

      setShow(!show)
    })
  }

  return (
    <div>
      <button onClick={handleClick} style={{ margin: '30px' }}>show</button>
      {show && <WrapCom />}
    </div>
  )
}

export default TimeSlice
