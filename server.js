const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alexa = require('alexa-app');

const app = express();

// Alexa things

// Creates route POST /cohort
const alexaApp = new alexa.app('cohort');

alexaApp.express({
  expressApp: app
});

alexaApp.launch(function(req, res) {
  const prompt = 'Welcome to your todo app! Say, list all todos to get started.';

  res.say(prompt)
    .reprompt(prompt)
    .shouldEndSession(false);
});

alexaApp.intent('ListIntent', {
  utterances: [
    'list all tasks',
    'list all todos'
  ],
}, function(req, res) {
  res.say("You have nothing todo!");
});

alexaApp.intent('AddTaskIntent', {
  utterances: [
    "add task",
    "add todo"
  ]
}, function(req, res) {
  res.say("Todo added!");
});

alexaApp.intent('DeleteTaskIntent', {
  utterances: [
    "delete task",
    "delete todo",
    "remove task",
    "remove todo"
  ]
}, function(req, res) {
  res.say("Todo deleted!");
});

// Rest of app

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
