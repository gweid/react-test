import React from 'react'
import styled from 'styled-components'

// 这实际上就是返回的一个组件，是一个 div 标签
// 这里设置的就是这个 div 标签的 css 样式
const DivCom = styled.div`
  color: red;
  font-size: 30px;
  
  .title {
    font-size: 50px;
    color: skyblue;
  }
`

// 这实际上就是返回的一个组件，是一个 h2 标签
// 这里设置的就是这个 h2 标签的 css 样式
const HCom = styled.h2`
  font-size: 50px;
  color: green;
`

export default function CssInJs() {
  return (
    <DivCom>
      你好
      <HCom>h2标签</HCom>
      <div className="title">标题</div>
    </DivCom>
  )
}
