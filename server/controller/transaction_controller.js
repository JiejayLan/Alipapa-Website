module.exports = (data) => {
  let firebase = data.firebase;
  
  return (req, res) => {
    if (req.body.datatype === 'SELLING_ITEMS'){
      firebase.database.ref('/orders').once('value').then((snapshot) => {
        let orders = snapshot.val();
        let sellItem = [];
        for (let orderID in orders){
          if(orders[orderID]["seller"] === req.body.userID){
            sellItem.push(orders[orderID]);
          }
        }

        res.json(sellItem);
      });
    }
    else if (req.body.datatype === 'BUYING_ITEMS'){
      firebase.database.ref('/orders').once('value').then((snapshot) => {
        let orders = snapshot.val();
        let buyItem = [];
        for (let orderID in orders){
          if(orders[orderID]["buyer"]["userID"] === req.body.userID){
            buyItem.push(orders[orderID]);
          }
        }

        res.json(buyItem);
      });
    }
  }
}