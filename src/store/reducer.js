import { ADD_NUMBER } from './constants.js';

const initState = {
  count: 0
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {...state, count: state.count + action.number};
    default:
      return state;
  }
}

export default reducer;