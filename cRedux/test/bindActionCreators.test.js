const { createStore, bindActionCreators } = require('../cRedux.js')

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

store.subscribe(() => {
  console.log(store.getState());
})

const changeName = (payload) => {
  return {
    type: 'change_name',
    payload,
  }
}

const action = bindActionCreators({ changeName }, store.dispatch)

action.changeName('lisi')
