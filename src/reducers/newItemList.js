const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'add_item':
      return [
        ...state,
        action.item
      ];
    default:
      return state;
  }
};