module.exports = (data) => {
  let firebase = data.firebase;
  
  return (req, res) => {
    if (req.body.datatype === 'SELLING_ITEMS'){
      firebase.database.ref('/orders').once('value').then((snapshot) => {
        const ORDERS = snapshot.val();

      });
    }
    else if (req.body.datatype === 'BUYING_ITEMS'){
      firebase.database.ref('/orders').once('value').then((snapshot) => {
        const ORDERS = snapshot.val();

      });
    }
  }
}