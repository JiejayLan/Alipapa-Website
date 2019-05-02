module.exports = (data) => {
  let firebase = data.firebase;

  return(req, res) => {
    firebase.database.ref('/total_items').once('value').then((snapshot) => {
      let totalItems = snapshot.val();
      let onSellItems = [];
      for (let itemID in totalItems){
        if(totalItems[itemID]["seller"] === req.body.userID 
          && totalItems[itemID]["status"] === "good"){
            onSellItems.push({itemID, ...totalItems[itemID]});
          }
      }
      res.json(onSellItems);
    });
  }
} 