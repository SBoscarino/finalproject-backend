const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  description: { type: String, required: true },
  personResponsible: { type: String, required: true },
  isComplete: { type: Boolean, required: true}
});

const Todo = mongoose.model('Todo', schema);
module.exports = Todo;
