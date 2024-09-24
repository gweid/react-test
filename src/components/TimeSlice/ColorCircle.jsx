import React, { useMemo } from "react"

const ColorCircle = ({ position }) => {
  // 随机颜色
  const getColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return `rgba(${r}, ${g}, ${b}, 0.8)`
  }

  // 随机位置
  const getPostion = (position) => {
    const { width , height } = position

    const top = Math.ceil(Math.random() * height)
    const left = Math.ceil(Math.random() * width)

    return { top: `${top}px`, left: `${left}px` }
  }

  const style = useMemo(() => ({
    width: '10px',
    height: '10px',
    background : getColor(),
    position: 'absolute',
    ...getPostion(position)
  }), [])

  return (
    <div style={style}></div>
  )
}

export default ColorCircle
