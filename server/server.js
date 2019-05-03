const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");
const ITEM_MANAGER = require('./service/ItemManager')({ firebase });
const ORDER_MANAGER = require('./service/OrderManager')({ firebase });
let bodyParser = require('body-parser');
let message_controller= require("./controller/message_controller.js")
let friend_controller= require("./controller/friend_controller.js")
const MESSAGE_SYSTEM = require('./service/messageManager');
const FRIEDN_MANAGER = require('./service/FriendManager')(firebase);
let auth = require('./controller/auth_controller.js')
const AUCTION_CHECKER = require('./AuctionCheck')({ itemManager: ITEM_MANAGER, orderManager: ORDER_MANAGER});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));
AUCTION_CHECKER.run();



//login a user
app.post("/login",auth.login({firebase}));
//delete a user
app.post("/delete",auth.delete({firebase}));

app.post('/purchase-intention/new', require('./controller/purchase_intention_controller.js')({ itemManager: ITEM_MANAGER }));
app.post('/process-pending-orders/:decision/:orderId', require('./controller/process_pending_order_controller.js')({ ITEM_MANAGER, ORDER_MANAGER, MESSAGE_SYSTEM: MESSAGE_SYSTEM(firebase), firebase}));

//a route to controll all message request
app.use("/message",message_controller(MESSAGE_SYSTEM(firebase)));

//a route to controll all friend request 
app.use("/friend",friend_controller(FRIEDN_MANAGER));

app.use('/controllers/items/:id', require('./controller/item_page_controller.js')({ itemManager: ITEM_MANAGER, orderManager: ORDER_MANAGER}));

app.post('/suhome', require('./controller/SUmanage_controller')({firebase}) );

app.post('/transactionHistory', require('./controller/transaction_controller')({firebase}) );

//	test endpoints
app.post('/test', require('./controller/test.js')( {itemManager: ITEM_MANAGER} ));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});