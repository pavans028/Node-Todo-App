// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Finish up the node and switch to REACT',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert the new todo', err);
    }
  
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  //Exercise: Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    name: 'Pavan Shetty New',
    age: 27,
    location: 'Chicago'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert the new user', err);
    }
  
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
