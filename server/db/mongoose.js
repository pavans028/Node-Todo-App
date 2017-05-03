var mongoose = require('mongoose');
//Tell mongoose to use built-in promise library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//export this as a module.
module.exports = {mongoose}; // ES6 style
