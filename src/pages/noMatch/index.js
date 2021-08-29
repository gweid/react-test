import React from 'react'
import { Result, Button } from 'antd';

export default function NoMatch(props) {
  const goHome = () => {
    // 通过路由跳转过来，可以直接在 props 中获取 history
    console.log(props.history)
    console.log(props.location)
    console.log(props.match)
    // props.history.push('/')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={goHome}>Back Home</Button>}
      />
    </div>
  )
}
