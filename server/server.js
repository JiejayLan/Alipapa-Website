const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const firebase = require("./firebase");


firebase.database.ref('/users').once('value').then((snapshot)=> {   
  console.log("connect successfully");  
});

app.use(express.static(publicPath));

app.post("/login",(req,res)=>{
  
  res.json({ user: 'tobi' });
})



app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up');
});