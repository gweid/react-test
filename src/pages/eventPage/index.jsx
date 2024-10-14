import React, { useEffect } from "react";

// const EventPage = () => {
//   const handleClick = () => {
//     console.log('按钮点击');
//   }

//   const handleChange = () => {

//   }

//   return (
//     <div>
//       <h1>----------------------- 事件系统 -----------------------</h1>
//       <div>
//         <button onClick={ handleClick }>点击</button>
//       </div>
//       <div>
//         <input onChange={ handleChange } />
//       </div>
//     </div>
//   )
// }

const EventPage = () => {
  const refObj = React.useRef(null)
  useEffect(()=>{
    const handler = ()=>{
      console.log('事件监听')
    }

    refObj.current.addEventListener('click',handler)

    return () => {
      refObj.current.removeEventListener('click',handler)
    }
  },[])

  const handleClick = ()=>{
    console.log('冒泡阶段执行')
  }
  const handleCaptureClick = ()=>{
    console.log('捕获阶段执行')
  }

  return (
    <button
      ref={refObj}
      onClick={handleClick}
      onClickCapture={handleCaptureClick}
    >
      点击
    </button>
  )
}

export default EventPage
