
export default (state = {}, action) => {
    switch (action.type) {
      case 'TABOO':
        return {
          ... action.tabooList
        };
      default:
        return state;
    }
  };