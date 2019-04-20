const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");
const ITEM_MANAGER = require('./service/ItemManager')({ firebase });
let bodyParser = require('body-parser');
let message_controller= require("./controller/message_controller.js")
const MESSAGE_SYSTEM = require('./service/messageManager');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

//login a user
app.post("/login",require('./controller/login_controller.js')({firebase}));

app.get("/profile", require('./controller/profile_controller.js')({firebase}));

//a route to control all message request
app.use("/message",message_controller(MESSAGE_SYSTEM(firebase)));
app.get('/controllers/items/:id', require('./controller/item_page_controller.js')({ itemManager: ITEM_MANAGER }));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});