const customerReducer = (state = [], action) => {
    switch(action.type) {
      case 'SELECT_CUST':
        return state=action.data;
      default:
        return state;
    }
  }
  export default customerReducer;