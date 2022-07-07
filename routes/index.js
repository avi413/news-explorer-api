const router = require('express').Router(); // creating a router
const { NotFoundError } = require('../middlewares/errors/errors');
const usersAouth = require('./usersAouth');
const articles = require('./articles');
const users = require('./users');

router.use(usersAouth, users, articles);

router.use((req, res, next) => { next(new NotFoundError('Requested resource not found')); });
module.exports = router;