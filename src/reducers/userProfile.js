//Profile Reducer

export default (state, action) => {
  switch(action.type) {
    case 'EDIT_PROFILE':
      return state.map((profile) => {
        if(profile.id === action.id) {
          return {
            ...profile,
            ...profile.updates
          };
        } else {
          return profile;
        }
      });
    case 'SET_PROFILE':
      return action.profile;
    default:
      return state;
  }  
};