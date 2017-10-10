'use strict';

const alexa = require('alexa-app');
const Todo = require('./models/todo');

// Creates route POST /cohort
const alexaApp = new alexa.app('cohort'); // eslint-disable-line

alexaApp.launch(function(req, res) {
  return Todo.find({})
    .exec(function(err, todos) {
      console.log('todos', todos);

      let say = 'Welcome to Cohort!';
      let reprompt = '';

      if (todos.length) {
        say += ` You have ${todos.length} to-dos to complete. Say, describe, to hear more about each, or add to-do to create a new task.`;
        reprompt = 'Would you like for me to list your tasks?';
      } else {
        say += ' You have no to-dos to do!';
        reprompt = 'You can add to-dos by saying, add todo.';
      }

      console.log('say', say);
      console.log('reprompt', reprompt);

      return res.say(say)
        .shouldEndSession(false)
        .reprompt(reprompt);
    });
});

alexaApp.intent('AMAZON.HelpIntent', {
  slots: {},
  utterances: []
}, function(request, response) {
  const helpOutput = 'You can say \'list tasks\' to begin. You can also say stop or exit to quit.';
  const reprompt = 'What would you like to do?';

  response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
});

alexaApp.intent('AMAZON.CancelIntent', {
  slots: {},
  utterances: []
}, function(request, response) {
  const cancelOutput = 'See you later, alligator.';

  response.say(cancelOutput);
});

alexaApp.intent('ListIntent', {
  utterances: [
    'list all tasks',
    'list all todos',
    'list tasks',
    'list todos'
  ]
}, function(req, res) {
  console.log('ListIntent', req);

  return Todo.find({})
    .exec(function(err, todos) {
      console.log('todos', todos);

      let say = '';
      let reprompt = '';

      if (todos.length) {
        say = `You have ${todos.length} to-dos to complete. Say, describe, to hear more about each, or add to-do to create a new task.`;
        reprompt = 'Would you like for me to list your tasks?';
      } else {
        say = 'You have no to-dos to do! Say add to-do to create a new task.';
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

alexaApp.intent('DescribeIntent', {
  utterances: [
    'tell me more',
    'describe',
    'description',
    'details'
  ]
}, function(req, res) {
  console.log('DescriptionIntent', req);

  return Todo.find({})
    .exec(function(err, todos) {
      // let description;
      let say = '';

      if (todos.length) {
        for (let i = 0; i < todos.length; i++) {
          say += `${todos[i].personResponsible}, is responsible for the task, ${todos[i].description},`;
          console.log(todos[i]);
        }
      } else {
        say = 'You have no to-dos to do!';
      }

      say += ' Say, add to-do to create a new task.';

      return res.say(say)
        .shouldEndSession(false)
        .send();
    });
});

alexaApp.intent('AddTaskIntent', {
  utterances: [
    'add task',
    'add a task',
    'add an item',
    'add item',
    'add todo',
    'add a todo',
    '{get a haircut|description}',
    '{drink kombucha|description}',
    '{play videogames|description}',
    '{do the dishes|description}',
    '{pay credit cards|description}',
    '{buy groceries|description}',
    '{vacuum living room|description}',
    '{vacuum the stairs|description}',
    '{take out the trash|description}',
    '{clean litter box|description}',
    '{rake leaves|description}',
    '{eat steak|description}',
    '{meet someone great today|description}',
    '{meet a great employer|description}',
    '{make something great|description}',
    '{person}'
  ],
  slots: [{
    description: 'AMAZON.LITERAL',
    person: 'AMAZON.US_FIRST_NAME'
  }]
}, function(req, res) {
  console.log('AddTaskIntent', req);

  const session = req.getSession();

  console.log('session', session);

  if (req.slots.person.value) {
    const newTodo = new Todo();

    newTodo.description = session.get('description');
    newTodo.personResponsible = req.slots.person.value;
    newTodo.isComplete = false;
    newTodo.dueDate = null;

    return newTodo.save()
      .then(function(todo) {
        return res.say(`Added todo, ${todo.description} for ${todo.personResponsible} to complete.`)
          .send();
      });
  } else if (req.slots.description.value) {
    session.set('description', req.slots.description.value);

    return res.say('Who is responsible?')
      .shouldEndSession(false)
      .send();
  }

  return res.say('Please say what you want to do.')
    .shouldEndSession(false)
    .send();
});

alexaApp.intent('DeleteTaskIntent', {
  utterances: [
    'delete task',
    'delete todo',
    'remove task',
    'remove todo'
  ]
}, function(req, res) {
  console.log('DeleteTaskIntent', req);

  return res.say('Todo deleted!')
    .send();
});

module.exports = alexaApp;
