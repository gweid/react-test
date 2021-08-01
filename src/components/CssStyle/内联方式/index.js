import React from 'react'

export default function LinkStyle() {
  const pStyle = {
    fontSize: '30px',
    color: 'red'
  }
  return (
    <div>
      <h1 style={{ fontSize: '50px' }}>内联h1</h1>
      <div style={pStyle}>内联p</div>
    </div>
  )
}

