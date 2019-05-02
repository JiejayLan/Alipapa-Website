
module.exports = (data) => {
  let firebase = data.firebase;
  
  return (req, res) => {
    if (req.body.datatype === 'SELLING_ITEMS'){
      firebase.database.ref('/orders').once('value').then((snapshot) => {
        let orders = snapshot.val();
        let sellItem = [];
        for (let orderID in orders){
          if(orders[orderID]["seller"] === req.body.userID){
            const buyerID = orders[orderID]["buyer"];
              sellItem.push({buyerID, ...orders[orderID]});
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
          if(orders[orderID]["buyer"] === req.body.userID){
            const sellerID = orders[orderID]["seller"];
              buyItem.push({sellerID, ...orders[orderID]});
          }
        }

        res.json(buyItem);
      });
    }
  }
}