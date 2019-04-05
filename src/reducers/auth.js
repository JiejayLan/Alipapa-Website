
export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ... action.userData
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};