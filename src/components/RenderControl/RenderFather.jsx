import React, { Component, useState, useMemo, useCallback } from "react";
import RenderSon from "./RenderSon";

// ------------------------------------ 父组件是 class 组件
// class RenderFather extends Component {
//   constructor() {
//     super()

//     this.state = {
//       num: 1,
//       title: 'title'
//     }
//   }

//   handleAdd = () => {
//     this.setState({
//       num: this.state.num + 1
//     })
//   }

//   handleChange = () => {
//     this.setState({
//       title: 'title变了'
//     })
//   }

//   render() {
//     const { title, num } = this.state
//     return (
//       <div>
//         <h1>------------------------------------------------------------------</h1>
//         <p>RenderFather</p>
//         <p>num: {num}</p>
//         <button onClick={this.handleAdd}>加一</button>
//         <button onClick={this.handleChange}>修改title</button>
//         <RenderSon title={title} callback={() => {}}/>
//       </div>
//     )
//   }
// }


// ---------------------------------- 父组件使用 useMemo 缓存 element
const RenderFather = () => {
  const [num, setNum] = useState(1)
  const [title, setTitle] = useState('title')

  const handleAdd = () => {
    setNum(num + 1)
  }

  const handleChange = () => {
    setTitle('title变了')
  }

  console.log('父组件渲染');

  // const handleCallback = () => {}
  const handleCallback = useCallback(() => {}, [])

  return (
    <div>
      <h1>------------------------------------------------------------------</h1>
      {/* { useMemo(()=> <RenderSon title={title} />, [title]) } */}
      <RenderSon title={title} callback={handleCallback} />
      <p>num: {num}</p>
      <button onClick={handleAdd}>加一</button>
      <button onClick={handleChange}>修改title</button>
    </div>
  )
}

export default RenderFather