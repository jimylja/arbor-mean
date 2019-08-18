const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

//Database connection
mongoose.connect('mongodb://admin_arbor:niBleI_2@ds111993.mlab.com:11993/arbor', { useNewUrlParser: true })
  .then(() => { console.log("Connected to database!"); })
  .catch(() => { console.log("Connection failed!"); });
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database conection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Conected to ${info.host}:${info.port}/${info.name}`);
  });

//Static
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true, parameterLimit: 50000 }));
app.use('/posts', routes.post);
app.use('/category', routes.category);

//for testing
app.get('/create', async function (req, res) {
  await res.sendFile(path.join(__dirname+'/public/index.html'));
});

module.exports = app;
