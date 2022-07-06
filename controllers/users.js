const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const { NotFoundError, BadRequest, UnauthorizedError } = require('../middlewares/errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const isValid = (error, res) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: error.message });
  }
  //throw new UnauthorizedError(error.message);
  return res.status(409).send({ message: error.message });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      }
      // user.password is the hash from the database
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect email or password');
          }
          // successful authentication
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret-string',
            {
              expiresIn: '7d',
            },
          );
          res.send({ token });
        })
        .catch(next);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    // return the found data to the user
    .then((users) => {
      if (!Object.keys(users).length) {
        throw new NotFoundError('No result found');
      }
      res.send({ data: users });
    })
    // if the record was not found, display an error message
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    return (
      User.findById(req.params.id)
        // return the found data to the user
        .then((user) => {
          if (!Object.keys(user).length) {
            throw new NotFoundError('No result found');
          }
          res.send({ data: user });
        })
        .catch(next)
    );
  }
  throw new BadRequest('Please provide correct id');
};

module.exports.getMe = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!Object.keys(user).length) { throw new NotFoundError('No result found'); }
    res.send({ data: user });
  })
  .catch(next);

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({ name, email, _id: user._id  }))
    .catch((err) => isValid(err, res));
};
