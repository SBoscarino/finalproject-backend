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
  const prompt = 'Would you like to know more?';

  res.say(prompt)
    .reprompt(prompt)
    .shouldEndSession(false);
});

alexaApp.intent('list', {
  slots: [
    {
      name: 'date',
      type: null,
      samples: []
    },
    {
      name: 'personResponsible',
      type: null,
      samples: []
    },
    {
      name: 'tasks',
      type: 'Description',
      samples: []
    }
  ],
  utterances: [
    'list all {tasks}',
    'what do I need {tasks} {date}',
    '{tasks}',
    'what are my {tasks}',
    'what does {tasks} need to do {date}',
    '{tasks} for {date}',
    '{tasks} {date} {personResponsible}'
  ],
}, function(req, res) {
  res.say("You have nothing todo!");
});

alexaApp.intent('addTask', {
  utterances: [
    "add task",
    "add todo"
  ]
}, function(req, res) {
  res.say("Todo added!");
});

alexaApp.intent('deleteTask', {
  utterances: [
    "delete task",
    "delete todo"
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
