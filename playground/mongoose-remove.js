const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


Todo.remove({}).then((result)=>{
    console.log("Removed::>",result)
});

Todo.findByIdandRemove('590929b8139bc11c9b43e92e').then((todo)=>{
    console.log("Removed todo:::>",todo);
});