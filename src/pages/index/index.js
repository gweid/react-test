import React from 'react';
import style from './index.module.css';

const arr = [
  {
    id: '110',
    text: '西游记'
  },
  {
    id: '111',
    text: '三国演义'
  },
  {
    id: '112',
    text: '水浒传'
  },
  {
    id: '113',
    text: '红楼梦'
  }
]

const Index = (props) => {

  const { history } = props

  const goToDetail = (id) => {
    // history.push(`/detail/${id}`)
    // history.push(`/detail?id=${id}`)
    history.push('/detail', { name: 'jack', age: 18 })
  }

  return (
    <div>
      <h1>首页</h1>
      <br />
      <ul style={{ paddingLeft: 30 }}>
        {
          arr.map(item => (
            <li key={item.id} onClick={() => goToDetail(item.id)}>{item.text}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Index
