import React, { Component } from "react"

const HOCAuthPage = (authCode) => {
  const allAuth = ['100001', '100002']

  const canShow = allAuth.includes(authCode)

  return (Component) => {
    return (props) => canShow ? <Component {...props} /> : <>无权限</>
  }
}

@HOCAuthPage('100003')
class AuthPageClassCom extends Component {
  render() {
    return (
      <div>class 组件</div>
    )
  }
}

const FunCom = () => <div>函数组件</div>
const AuthPageFunCom = HOCAuthPage('100001')(FunCom)

export {
  AuthPageClassCom,
  AuthPageFunCom
}
