import React, { useEffect, useRef, useState } from "react"
import styles from './index.module.css'

/**
 * 实现思路
 *  1、通过 useRef 获取元素，缓存变量
 *  2、useEffect 初始化计算容器的高度。截取初始化列表长度，这里需要 div 占位，撑起滚动条
 *  3、通过监听滚动容器的 onScroll 事件，根据 scrollTop 来计算渲染区域向上偏移量, 这里需要注意的是，当用户向下滑动的时候，为了渲染区域，能在可视区域内，可视区域要向上滚动；当用户向上滑动的时候，可视区域要向下滚动
 *  4、通过重新计算 end 和 start 来重新渲染列表
 */
const VirtualList = () => {
  const [dataList, setDataList] = useState([])
  const [position, setPosition] = useState([0, 0]) // 截取缓冲区 + 视图区索引

  const scrollInfo = useRef({
    containerHeight: 0, // 容器高度
    itemHeight: 50, // 每一个item高度
    bufferCount: 8, // 缓冲区个数
    renderCount: 0 // 渲染区个数
  })

  const boxRef = useRef(null)
  const scrollRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {

    const containerHeight = boxRef.current.offsetHeight

    const { itemHeight, bufferCount } = scrollInfo.current
    // 计算出一屏幕需要渲染多少个：屏幕内渲染个数 + 缓冲区渲染个数
    const renderCount = Math.ceil(containerHeight / itemHeight) + bufferCount

    scrollInfo.current.renderCount = renderCount
    scrollInfo.current.containerHeight = containerHeight

    // 初始需要渲染的列表的起始位置
    setPosition([0, renderCount])

    const list = new Array(2000)
      .fill('item')
      .map((item, index) => `${item}-${index + 1}`)

    setDataList(list)
  }, [])

  const handleScroll = () => {
    const { itemHeight, renderCount } = scrollInfo.current
    const { scrollTop } = scrollRef.current

    // 滚动开始，计算需要渲染的起始位置
    const start = Math.ceil(scrollTop / itemHeight)
    const end = start + renderCount
    if (start !== position[0] || end !== position[1]) {
      setPosition([start, end])
    }

    const currentOffset = scrollTop - (scrollTop % itemHeight)
    // 偏移，造成下滑效果
    contextRef.current.style.transform = `translate(0, ${currentOffset}px)`
  }

  const { containerHeight, itemHeight } = scrollInfo.current

  const [start, end] = position
  const renderList = dataList.slice(start, end)

  return (
    <div
      ref={boxRef}
      className={styles['box']}
    >
      <div
        ref={scrollRef}
        className={styles['scroll-box']}
        style={{ height: `${containerHeight}px` }}
        onScroll={handleScroll}
      >
        <div ref={contextRef}>
          {
            renderList.map((item) => (
              <div
                className={styles['item-box']}
                style={{ height: `${itemHeight}px` }}
                key={item}
              >
                {item}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default VirtualList
