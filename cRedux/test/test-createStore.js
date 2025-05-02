const { createStore } = require('../cRedux.js')

const initState = {
  name: 'zhangsan',
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'chnage_name':
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(reducer, initState)

store.subscribe(() => {
  console.log(store.getState());
})

const action = {
  type: 'chnage_name',
  payload: 'lisi',
}

store.dispatch(action)
