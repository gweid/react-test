// 事件监控 HOC
import React, { useEffect, useRef } from "react"

const ClickHoc = (Component) => {
  const dom = useRef(null)

  useEffect(() => {
    const handleClick = () => console.log('点击了');

    dom.current.addEventListener('click', handleClick)

    return () => dom.current.removeEventListener('click', handleClick)
  }, [])

  return props => {
    return (
      <div ref={dom}><Component {...props} /></div>
    )
  }
}

@ClickHoc
class Index extends React.Component {
  render() {
    return (
      <div className='index'>
        <p>hello，world</p>
        <button>点击</button>
      </div>
    )
  }
}

export default Index
