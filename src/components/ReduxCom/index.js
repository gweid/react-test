function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LIST':
      return { ...state, userList: [...state.userList, action.info] };
    case 'CHANGE_NAME':
      return {
        ...state,
        userList: state.userList.map((item, index) => {
          if (index === action.index) {
            return { ...item, name: action.newName };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
