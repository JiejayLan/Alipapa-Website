//return the whole taboo list as an object
module.exports.checkTaboo = (data) => {
    let firebase = data.firebase;

    return (req, res) => {
        firebase.database.ref('/superUser/taboo').once('value').then((snapshot) => {
            
            let tabooList = snapshot.val();
            console.log(tabooList);
            res.json(tabooList);
        })
    }
}