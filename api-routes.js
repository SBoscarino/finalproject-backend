const express = require('express');
const Todo = require('./models/todo');
const router = express.Router();
const Alexa = require('alexa-sdk');

const alexaHandlers = {
  'list': function() {
    console.log('list func');
    this.emit(':tell', 'listing tasks');
  },
  'addTask': function() {
    console.log('list func');
    this.emit(':tell', 'adding task');
  },
  'deleteTask': function() {
    console.log('list func');
    this.emit(':tell', 'deleting task');
  }
};

//testing alexa things
router.post('/api/alexa', (req, res) => {
  console.log('Alexa headers', req.headers);
  console.log('Alexa params', req.params);
  console.log('Alexa body', req.body);

  const alexa = Alexa.handler(req.body, {});
  alexa.registerHandlers(alexaHandlers);
  const resp = alexa.execute();
  console.log('alexa resp', resp);

  res.send(resp);
});

//get all
router.get('/api/todos', function(req, res) {
  Todo.find({})
    .exec(function(err, todos) {
      res.send(todos);
    });
});

//delete one
router.delete('/api/todos/delete/:id', (req, res) => {
  Todo.deleteOne({_id: req.params.id}).then(function(){
    console.log("in deletion route");
    res.sendStatus(204);
  }).catch(function(err){
    res.redirect('/')
    })
});

// add one
router.post('/api/todos', (req, res) => {
  var newTodo = new Todo();
  newTodo.description = req.body.description;
  newTodo.personResponsible = req.body.personResponsible;
  newTodo.isComplete = false;
  newTodo.dueDate = req.body.dueDate;
  newTodo.save().then(function(){
    res.sendStatus(204);
  })
});

module.exports = router;
