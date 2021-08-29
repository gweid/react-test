import React from 'react'

const Detail = (props) => {
  const { match, location } = props
  // console.log(match)
  console.log(location)

  return (
    <div>
      {/* <p>详情：{match.params.id}</p> */}
      <div>
        详情：
        <p>姓名：{location.state.name}</p>
        <p>年龄：{location.state.age}</p>
      </div>
    </div>
  )
}

export default Detail