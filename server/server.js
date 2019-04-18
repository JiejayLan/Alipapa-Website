const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");
const ITEM_MANAGER = require('./service/ItemManager')({ firebase });
let bodyParser = require('body-parser');
let message_controller= require("./controller/message_controller")
const MESSAGE_SYSTEM = require('./service/messageManager');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

//login a user
app.post("/login",require('./controller/login_controller.js')({ firebase }));
app.post("/message",message_controller.sendMessage(MESSAGE_SYSTEM(firebase)));
app.post("/checkReceiveMessage",message_controller.checkReceiveMessage(MESSAGE_SYSTEM(firebase)));
app.get('/controllers/items/:id', require('./controller/item_page_controller.js')({ itemManager: ITEM_MANAGER }));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});