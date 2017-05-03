var mongoose = require('mongoose');

// Model: Todo, using validators and default values.
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

//Export it as a separate module.
module.exports = {User}
