'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alexaApp = require('./alexa');

const app = express();

alexaApp.express({
  expressApp: app
});

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI);
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

const port = process.env.PORT || process.env.LOC_PORT || 5003;

app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.info(`Server Running: ${process.env.LOC_PORT}`);

  return null;
});
