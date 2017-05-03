const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  // $set will specify the action
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('590929b8139bc11c9b43e92d')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('590929b8139bc11c9b43e92e')
  }, {
    $set: {
      name: 'Pavan S'
    },
    $inc: {
      age: 100
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
