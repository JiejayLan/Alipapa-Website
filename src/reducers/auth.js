
export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ... action.userData
      };
    case 'LOGOUT':
      return     {
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        ...action.userData
      };
    default:
      return state;
  }
};