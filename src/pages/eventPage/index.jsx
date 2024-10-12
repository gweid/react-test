import React from "react";

const EventPage = () => {
  const handleClick = () => {
    console.log('按钮点击');
  }

  const handleChange = () => {

  }

  return (
    <div>
      <h1>----------------------- 事件系统 -----------------------</h1>
      <div>
        <button onClick={ handleClick }>点击</button>
      </div>
      <div>
        <input onChange={ handleChange } />
      </div>
    </div>
  )
}

export default EventPage
