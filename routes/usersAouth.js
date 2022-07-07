const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validate');

router.post('/signin', signinValidate, login);
router.post('/signup',signupValidate,  createUser);

module.exports = router;
