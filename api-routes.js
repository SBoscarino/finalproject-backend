const express = require('express');
const Todo = require('./models/todo');
const router = express.Router();


//get all
router.get('/api/todos', function(req, res) {
  Todo.find({})
    .exec(function(err, sets) {
      res.send(todos);
    });
});

// route for deleting one

// route for updating one

// route for adding one
router.post('/api/todos', (req, res) => {
  var newTodo = new Todo();
  newTodo.description = req.body.description;
  newTodo.personResponsible = req.body.personResponsible;
  newTodo.isComplete = false;
  newTodo.dueDate = req.body.dueDate;
  newTodo.save().then(function(result){
    console.log("in post route:", result);
    res.redirect('/');
  })
});




module.exports = router;
