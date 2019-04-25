//Profile Reducer

export default (state = {}, action) => {
  switch(action.type) {
    case 'EDIT_PROFILE':
          return {
            ...auth,
            ...auth.updates
          };
  
    default:
      return state;
  }  
};