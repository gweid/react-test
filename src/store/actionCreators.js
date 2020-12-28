import { ADD_NUMBER } from './constants.js';

const addNumber = (number) => ({type: ADD_NUMBER, number: number});

export default {
  addNumber
};