import { ADD_NUMBER, REDUCE_NUMBER, CHANGE_INFO } from './actionTypes.js';

const initState = {
  count: 0,
  info: {
    name: '',
    age: 10
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {...state, count: state.count + action.number};
    case REDUCE_NUMBER:
      return {...state, count: state.count - action.number};
    case CHANGE_INFO:
      return {...state, info: action.info}
    default:
      return state;
  }
}

export default reducer;