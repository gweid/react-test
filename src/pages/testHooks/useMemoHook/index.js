import React, { useMemo, useState, memo } from 'react'

// --------------------------- 不要滥用 useMemo
// const useMemoHook = () => {
//   const total = 0

//   const resTotal = useMemo(() => total, [])

//   return (
//     <div>
//       <hr />
//       <h2>useMemo的使用</h2>
//       <p>总量：{resTotal}</p>
//     </div>
//   )
// }

// ----------------------------- 大量计算使用 useMemo 优化性能
// const calcTotal = (count) => {
//   console.log('重新计算了')

//   let total = 0
//   for(let i = 0; i < count; i++) {
//     total += count
//   }

//   return total
// }

// const useMemoHook = () => {
//   const [count, setCount] = useState(0)

//   // useMemo 第一个参数是返回一个值
//   const resTotal = useMemo(() => calcTotal(count), [count])

//   return (
//     <div>
//       <hr />
//       <h2>useMemo的使用</h2>
//       <p>总量：{resTotal}</p>
//       <button onClick={e => setCount(count + 1)}>add total</button>
//     </div>
//   )
// }

const MemoTest = memo(({ info }) => {
  console.log('MemoTest重新渲染')

  return (
    <div>name: {info.name}</div>
  )
})

const UseMemoHook = () => {
  const [count, setCount] = useState(0)

  const infoDetail = useMemo(() => ({ name: 'jack' }), [])

  return (
    <div>
      <hr />
      <h2>useMemo的使用</h2>
      <MemoTest info={infoDetail} />
      <button onClick={e => setCount(count + 1)}>add total</button>
    </div>
  )
}

export default UseMemoHook
