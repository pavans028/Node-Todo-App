const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany will delete all the instances
  db.collection('Todos').deleteMany({text: 'Mocha something new'}).then((result) => {
    console.log(result);
  });

  // deleteOne will delete the first occurence
  db.collection('Todos').deleteOne({text: 'Mocha and SuperTest'}).then((result) => {
    console.log(result);
  });

  // findOneAndDelete will delete the first one
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });
  // Exrecises
  // deleteMany will delete all the instances 
  db.collection('Users').deleteMany({name: 'Pavan'});

  // findOneAndDelete will delete the first one
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("590929b8139bc11c9b43e92e")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });

  db.close();
});
