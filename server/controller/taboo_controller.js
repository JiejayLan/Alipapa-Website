//return the whole taboo list as an object
module.exports.checkTaboo = (data) => {
    let firebase = data.firebase;

    return (req, res) => {
        firebase.database.ref('/taboo').once('value').then((snapshot) => {
            let tabooList = snapshot.val();
            res.json(tabooList);
        })
    }
}