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
  var todo = new Todo();
  set.description = req.body.description;
  set.personResponsible = req.body.personResponsible;
  set.isComplete = false;
  newTodo.save().then(function(result){
    console.log("in post route:", result);
    res.redirect('/');
  })
});




module.exports = router;
