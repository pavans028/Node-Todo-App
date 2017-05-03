//Libraries
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

// User defined models/modules
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//Create a new express app.
var app = express();

// Tell express to use bodyparser to parse the request body
app.use(bodyParser.json());

// Add a new todo to db
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  }); 

  todo.save().then((doc) => {
    res.send(doc); // default status code 200
  }, (e) => {
    res.status(400).send(e); // set the status code
  });
});

// get all the todos from db
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// get a individual todo from db
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req, res)=>{
  var id= req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});

module.exports = {app}; // export the app for mocha/supertest testing
