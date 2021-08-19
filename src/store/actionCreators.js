import { ADD_NUMBER, REDUCE_NUMBER, CHANGE_INFO } from './actionTypes.js';

export const addNumber = number => ({type: ADD_NUMBER, number});

export const reduceNumber = number => ({type: REDUCE_NUMBER, number});

export const changeInfo = info => ({type: CHANGE_INFO, info})

// 用于 redux-thunk
export const getInfo = (dispatch, getState) => {
  // 做异步操作
  // axios.get('xxxxxxx').then(res => {
  //   // 在这里调用 dispatch 执行相关操作
  //   dispatch(reduceNumber(10))
  // })
  setTimeout(() => {
    dispatch(changeInfo({name: 'lucy', age: 20}))
  })
}