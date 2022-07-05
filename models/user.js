const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // describe the validate feature
      validator(value) {
        // validator is a data validation feature. v is the age value
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Must be a Valid email address', // when the validator returns false, this message will be displayed
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
