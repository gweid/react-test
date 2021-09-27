// import React, { useContext } from 'react'
// import { UserContext, TokenContext } from './index'
import React from 'react'
import userInfoHook from '../../hooks/useInfoHooks'

const CustomHook = () => {
  // const user = useContext(UserContext)
  // const token = useContext(TokenContext)

  const [user, token] = userInfoHook()

  console.log('\n--------------自定义hook---------------------')
  console.log(user)
  console.log(token)

  return (
    <div>
      
    </div>
  )
}

export default CustomHook

