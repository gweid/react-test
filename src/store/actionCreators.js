import { ADD_NUMBER, REDUCE_NUMBER } from './actionTypes.js';

const addNumber = number => ({type: ADD_NUMBER, number});

const reduceNumber = number => ({type: REDUCE_NUMBER, number});

export {
  addNumber,
  reduceNumber
};