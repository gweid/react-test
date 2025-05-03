const { createStore } = require('../cRedux.js')

const initState = {
  name: 'zhangsan',
}

const reducer = (state, action) => {
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

const store = createStore(reducer, initState)

console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
})

const action = {
  type: 'change_name',
  payload: 'lisi',
}

store.dispatch(action)
