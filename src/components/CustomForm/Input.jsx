import React from 'react'

const Input = ({ onChange, value }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => (onChange && onChange(e.target.value))}
    />
  )
}

Input.displayName = 'Input'

export default Input
