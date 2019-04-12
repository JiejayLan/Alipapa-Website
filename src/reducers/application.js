const applicationReducerDefaultState = [];

export default (state = applicationReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_APPLICATION': 
      return [
        ...state,
        action.application
      ];
    default:
      return state;
  }
};

