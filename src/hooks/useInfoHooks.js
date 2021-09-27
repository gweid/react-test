import { useContext } from 'react'
import { TokenContext, UserContext } from "../pages/testHooks"

const useInfoHook = () => {
  const user = useContext(UserContext)
  const token = useContext(TokenContext)

  return [user, token]
}

export default useInfoHook
