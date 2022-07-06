const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,

    minlength: 2,
    maxlength: 200,
  },
  link: {
    type: String,
    required: true,
    validate: {
      // describe the validate feature
      validator(value) {
        // validator is a data validation feature. v is the age value
        return /^(http|https?):\/\/+(www\.)?[a-z0-9\s]{3,}\.[a-z]{2,3}(\/#?[a-z0-9\s])?/.test(
          value,
        );
      },
      message: 'Must be a Valid URL', // when the validator returns false, this message will be displayed
    },
  },
  image: {
    type: String,
    equired: true,
    validate: {
      // describe the validate feature
      validator(value) {
        // validator is a data validation feature. v is the age value
        const regex = /^(http|https?):\/\/+(www\.)?[.a-z0-9\s]{3,}\.[a-z]{2,3}(\/#?[.a-z0-9\s])?/;
        return regex.test(value);
      },
      message: 'Must be a Valid URL', // when the validator returns false, this message will be displayed
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});
module.exports = mongoose.model('article', articleSchema);
