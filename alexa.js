'use strict';

const alexa = require('alexa-app');
const Todo = require('./models/todo');

// Creates route POST /cohort
const alexaApp = new alexa.app('cohort');

alexaApp.launch(function(req, res) {
  const prompt = 'Welcome to your todo app! Say, list all todos to get started.';

  res.say(prompt)
    .reprompt(prompt)
    .shouldEndSession(false);
});

alexaApp.intent('ListIntent', {
  slots: [],
  utterances: [
    'list all tasks',
    'list all todos',
    'list tasks',
    'list todos'
  ],
}, function(req, res) {
  console.log('ListIntent', req);

  Todo.find({})
    .exec(function(err, todos) {
      let say = '';
      let prompt = '';

      if (todos.length) {
        say = `You have ${todos.length} to-dos to complete.`;
        prompt = 'Would you like me to list them?';
      } else {
        say = 'You have no to-dos to do!';
        prompt = 'You can add to-dos by saying, add todo blablabla';
      }

      res.say(say)
        .prompt(prompt);
    });
});

alexaApp.intent('AddTaskIntent', {
  utterances: [
    "add task",
    "add todo"
  ]
}, function(req, res) {
  console.log('AddTaskIntent', req);

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
  console.log('DeleteTaskIntent', req);

  res.say("Todo deleted!");
});

module.exports = alexaApp;
