const { createStore, combineReducers } = require('../cRedux.js')

const initUserState = {
  name: 'zhangsan',
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'change_name':
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}


const initCountState = {
  count: 0,
}

const countReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
       ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  user: userReducer,
  count: countReducer,
})


const store = createStore(rootReducer, {
  user: initUserState,
  count: initCountState,
})

console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
})

const action = {
  type: 'change_name',
  payload: 'lisi',
}

store.dispatch(action)

const action2 = {
  type: 'add',
  payload: 2,
}

store.dispatch(action2)