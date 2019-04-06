const path = require('path');
const express = require('express');
const app = express();
const reload = require('reload'), watch = require('watch');
const reload_server = reload(app);
const publicPath = path.join(__dirname, '..', 'public');
watch.watchTree(__dirname + '/../src', function (f, curr, prev) {
  reload_server.reload();
});
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log('Server is up on', port);
});