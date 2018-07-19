const userAccessReducer = (state = {}, action) => {
    switch(action.type) {
      case 'GET_ACCESS':
        return state=action.data;
      case 'SET_ACCESS':
        return state=action.data;
      default:
        return state;
    }
  }
  export default userAccessReducer;