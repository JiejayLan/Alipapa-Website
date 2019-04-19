const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");
const ITEM_MANAGER = require('./service/ItemManager')({ firebase });
let bodyParser = require('body-parser');
// const reload = require("reload");
const watch = require('watch');
// const reload_server = reload(app);
// watch.watchTree(__dirname + '/../src', function (f, curr, prev) {
//   reload_server.reload();
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.database.ref('/users').once('value').then((snapshot)=> {   
  console.log("connect successfully");  
});

app.use(express.static(publicPath));

//login a user
app.post("/login",require('./controller/login_controller.js')({ firebase }));
app.get('/controllers/items/:id', require('./controller/item_page_controller.js')({ itemManager: ITEM_MANAGER }));

//	test endpoints
app.post('/test', require('./controller/test.js')( {itemManager: ITEM_MANAGER} ));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});