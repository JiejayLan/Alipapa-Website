const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.database.ref('/users').once('value').then((snapshot)=> {   
  console.log("connect successfully");  
});
// require('./controllers/job_des_controller.js')(CONNECTION)
app.use(express.static(publicPath));

app.post("/login",require('./controller/login_controller.js')(firebase));


app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});