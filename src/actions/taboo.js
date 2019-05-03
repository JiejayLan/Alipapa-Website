export const taboo = (
    tabooList = {}
  ) => {
      console.log("action",tabooList);
    return ({
      type: 'TABOO',
      tabooList:tabooList
  })};