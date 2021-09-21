import React, { useContext } from 'react'

import { UserContext, ThemeContext } from './index'

const UseContextHook = () => {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)

  console.log(user)
  console.log(theme)

  return (
    <div>
      <hr />
      <h2>useContext</h2>
      <p>name: {user.name}，token: {user.token}</p>
      <p>color: {theme.color}</p>
    </div>
  )
}

export default UseContextHook
