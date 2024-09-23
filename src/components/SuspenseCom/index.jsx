import React, { Suspense, useEffect, useState } from "react";

const getData = () => {
  return new Promise((resolve) => {
    resolve({
      list: [
        {
          id: '10001',
          name: 'jack'
        },
        {
          id: '10002',
          name: 'mark'
        },
      ]
    })
  })
}

const UserInfo = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      const { list } = await getData()
      setList(list)
    })()
  }, [])

  return (
    <div>
      {list.map(item => (
        <div key={item.id}>名字: {item.name}</div>
      ))}
    </div>
  )
}

const Loading = () => {
  return (
    <div>loding...</div>
  )
}

const SuspenseCom = () => {

  return (
    <div>
      <h1>-------------------------- Suspense --------------------------</h1>
      <Suspense fallback={<Loading />}>
        <UserInfo />
      </Suspense>
    </div>
  )
}

export default SuspenseCom
