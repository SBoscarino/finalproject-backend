const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./api-routes.js'));

var port = process.env.PORT || 5003;

app.listen(process.env.PORT || process.env.LOC_PORT,function(err){
  if (err) return console.log(err);
  console.log('Server Running: '+ process.env.LOC_PORT);
});
