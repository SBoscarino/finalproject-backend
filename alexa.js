'use strict';

const alexa = require('alexa-app');
const Todo = require('./models/todo');

// Creates route POST /cohort
const alexaApp = new alexa.app('cohort');

alexaApp.launch(function(req, res) {
  const prompt = 'Welcome! Say, list all todos to get started.';

  res.say(prompt)
    .reprompt(prompt)
    .shouldEndSession(false);
});

alexaApp.intent('ListIntent', {
  utterances: [
    'list all tasks',
    'list all todos',
    'list tasks',
    'list todos'
  ],
}, function(req, res) {
  console.log('ListIntent', req);

  return Todo.find({})
    .exec(function(err, todos) {
      console.log('todos', todos);

      let say = '';
      let reprompt = '';

      if (todos.length) {
        say = `You have ${todos.length} to-dos to complete. 'Say, description, to hear more about each.`;
        reprompt = 'Would you like for me to list your tasks?';
      } else {
        say = 'You have no to-dos to do!';
        reprompt = 'You can add to-dos by saying, add todo.';
      }

      console.log('say', say);
      console.log('reprompt', reprompt);

      return res.say(say)
        .shouldEndSession(false)
        .reprompt(reprompt)
        .send();
    });
});

alexaApp.intent('DescriptionIntent', {
  utterances: [
    "description",
    "tell me more",
    "details"
  ]
}, function(req, res) {
  console.log('DescriptionIntent', req);

  for(let i; i < todos.length; i++){
    res.say(`${todos[i].description} and ${todos[i].personResponsible} is responsible.`)
  }
  return res.say("You have reached description intent")
    .send();
});


alexaApp.intent('AddTaskIntent', {
  utterances: [
    "add task",
    "add todo"
  ]
}, function(req, res) {
  console.log('AddTaskIntent', req);

  return res.say("Todo added!")
    .send();
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

  return res.say("Todo deleted!")
    .send();
});

module.exports = alexaApp;
